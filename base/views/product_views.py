from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.db.models import Q
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.http import JsonResponse

from base.models import Product, Review
from base.serializers import ProductSerializer


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    products = Product.objects.filter(
        name__icontains=query).order_by('-createdAt')

    page = request.query_params.get('page')
    paginator = Paginator(products, 5)

    try:
        page_obj = paginator.page(page)
    except PageNotAnInteger:
        page_obj = paginator.page(1)
    except EmptyPage:
        page_obj = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    serializer = ProductSerializer(page_obj.object_list, many=True)
    
    return JsonResponse({
        'products': serializer.data,
        'page': page,
        'pages': paginator.num_pages
    })


@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return JsonResponse(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)
        serializer = ProductSerializer(product, many=False)
        return JsonResponse(serializer.data)
    except Product.DoesNotExist:
        return JsonResponse({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JsonResponse({'detail': f'Error retrieving product: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        discount=0,
        about='',
        size='',
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description='',
        image='sample_image.jpg',  # Placeholder image
    )

    serializer = ProductSerializer(product, many=False)
    return JsonResponse(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    try:
        data = request.data
        product = Product.objects.get(_id=pk)

        product.name = data['name']
        product.price = data['price']
        product.brand = data['brand']
        product.discount = data['discount']
        product.about = data['about']
        product.size = data['size']
        product.countInStock = data['countInStock']
        product.category = data['category']
        product.description = data['description']

        product.save()
        serializer = ProductSerializer(product, many=False)
        return JsonResponse(serializer.data)
     
    except Product.DoesNotExist:
        return JsonResponse({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JsonResponse({'detail': f'Error updating product: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)
        product.delete()
        return JsonResponse({'detail': 'Product deleted successfully'})
    except Product.DoesNotExist:
        return JsonResponse({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JsonResponse({'detail': f'Error deleting product: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def uploadImage(request):
    try:
        data = request.data
        product_id = data['product_id']
        product = Product.objects.get(_id=product_id)

        product.image = request.FILES.get('image')
        product.save()

        return JsonResponse({'detail': 'Image was uploaded successfully'})
    except Product.DoesNotExist:
        return JsonResponse({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JsonResponse({'detail': f'Error uploading image: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    try:
        product = Product.objects.get(_id=pk)
        data = request.data

        # 1 - Review already exists
        alreadyExists = product.review_set.filter(user=user).exists() # type: ignore
        if alreadyExists:
            content = {'detail': 'Product already reviewed'}
            return JsonResponse(content, status=status.HTTP_400_BAD_REQUEST)

        # 2 - No Rating or 0
        elif data['rating'] == 0:
            content = {'detail': 'Please select a rating'}
            return JsonResponse(content, status=status.HTTP_400_BAD_REQUEST)

        # 3 - Create review
        else:
            review = Review.objects.create(
                user=user,
                product=product,
                name=user.first_name,
                rating=data['rating'],
                comment=data['comment'],
            )

            reviews = product.review_set.all() # type: ignore
            product.numReviews = len(reviews)

            total = 0
            for i in reviews:
                total += i.rating

            product.rating = total / len(reviews) # type: ignore
            product.save()

            return JsonResponse({'detail': 'Review added successfully'})
    except Product.DoesNotExist:
        return JsonResponse({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JsonResponse({'detail': f'Error creating review: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
