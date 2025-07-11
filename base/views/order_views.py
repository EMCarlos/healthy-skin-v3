from datetime import datetime

from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.http import JsonResponse
from rest_framework.response import Response

from base.models import Order, OrderItem, Product, ShippingAddress
from base.serializers import OrderSerializer, ProductSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    try:
        orderItems = data['orderItems']

        if orderItems and len(orderItems) == 0:
            return JsonResponse({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # (1) Create order
            order = Order.objects.create(
                user=user,
                paymentMethod=data['paymentMethod'],
                taxPrice=data['taxPrice'],
                shippingPrice=data['shippingPrice'],
                totalPrice=data['totalPrice']
            )

            # (2) Create shipping address
            shipping = ShippingAddress.objects.create(
                order=order,
                address=data['shippingAddress']['address'],
                phone=data['shippingAddress']['phone'],
                messageFrom=data['shippingAddress']['messageFrom'],
                messageFor=data['shippingAddress']['messageFor'],
                message=data['shippingAddress']['message'],
                city=data['shippingAddress']['city'],
                postalCode=data['shippingAddress']['postalCode'],
                country=data['shippingAddress']['country'],
            )

            # (3) Create order items and set order to orderItem relationship
            for i in orderItems:
                product = Product.objects.get(_id=i['product'])

                item = OrderItem.objects.create(
                    product=product,
                    order=order,
                    name=product.name,
                    qty=i['qty'],
                    price=i['price'],
                    image=product.image.url,
                )

                # (4) Update stock
                product.countInStock -= item.qty  # type: ignore
                product.save()

            serializer = OrderSerializer(order, many=False)
            return JsonResponse(serializer.data)
    except Product.DoesNotExist:
        return JsonResponse({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    except KeyError as e:
        return JsonResponse({'detail': f'Missing field: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return JsonResponse({'detail': f'Error creating order: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except Order.DoesNotExist:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'detail': f'Error retrieving order: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Order was paid')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response('Order was delivered')
