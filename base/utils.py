import json
from .models import *

def cookieCart(request):

	#Create empty cart for now for non-logged in user
	try:
		cart = json.loads(request.COOKIES['cart'])
	except:
		cart = {}
		print('CART:', cart)

	items = []
	order = {'get_cart_total':0, 'get_cart_items':0, 'shipping':False}
	cartItems = order['get_cart_items']

	for i in cart:
		#We use try block to prevent items in cart that may have been removed from causing error
		try:	
			if(cart[i]['quantity']>0): #items with negative quantity = lot of freebies  
				cartItems += cart[i]['quantity']

				product = Product.objects.get(_id=i)
				total = (product.price * cart[i]['quantity'])

				order['get_cart_total'] += total
				order['get_cart_items'] += cart[i]['quantity']

				item = {
				'id':product._id,
				'product':{'id':product._id,'name':product.name, 'price':product.price, 
				'image':product.image}, 'quantity':cart[i]['quantity'],
				}
				items.append(item)

		except:
			pass
			
	return {'cartItems':cartItems ,'order':order, 'items':items}
    
def cartData(request):
	if request.user.is_authenticated:
		user = request.user
		
	else:
		cookieData = cookieCart(request)
		cartItems = cookieData['cartItems']

	return {'cartItems':cartItems}