import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FAQ = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen container mx-auto px-4 py-16 bg-background">
        <h1 className="text-4xl font-playfair font-bold text-center mb-12">
          Frequently Asked Questions
        </h1>

        <Tabs
          defaultValue="payment"
          className="max-w-4xl mx-auto"
        >
          <TabsList className="flex flex-col sm:flex-row w-full h-auto p-0 bg-transparent gap-2">
            <TabsTrigger
              value="payment"
              className="w-full data-[state=active]:bg-purple data-[state=active]:text-white"
            >
              Payment Methods
            </TabsTrigger>
            <TabsTrigger
              value="tracking"
              className="w-full data-[state=active]:bg-purple data-[state=active]:text-white"
            >
              Order Tracking
            </TabsTrigger>
            <TabsTrigger
              value="status"
              className="w-full data-[state=active]:bg-purple data-[state=active]:text-white"
            >
              Order Status
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="w-full data-[state=active]:bg-purple data-[state=active]:text-white"
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              value="returns"
              className="w-full data-[state=active]:bg-purple data-[state=active]:text-white"
            >
              Returns
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent
              value="payment"
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-4">
                Why PayPal is the only enabled payment method?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                You can pay with cash on delivery or transfer the money to our bank account. We will
                process your order once the payment is confirmed.
              </p>
            </TabsContent>

            <TabsContent
              value="tracking"
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-4">How can I track my orders?</h3>
              <p className="text-gray-600 leading-relaxed">
                You can track the status of your order online at HealthySkin.com. Click on the
                person icon at the top of the page and then click on Orders to see your Recent
                Orders. Check the order number and click on details for the shipment that you would
                like to track, and a detailed order information page will be displayed. Please
                estimate 1 - 2 business days from the time your order has been created.
              </p>
            </TabsContent>

            <TabsContent
              value="status"
              className="bg-white p-6 rounded-lg shadow-sm space-y-6"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">Order Submitted - "Placed"</h3>
                <p className="text-gray-600 leading-relaxed">
                  Once you have placed your order on HealthySkin and your payment has been
                  authorized, your order status will appear as "Placed."
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Order Processing - "In Progress"</h3>
                <p className="text-gray-600 leading-relaxed">
                  Once you have placed your order, it will be sent to our warehouse to be processed
                  and packed for shipment. During this time, your order status will appear as "In
                  Progress." Please allow 1 - 2 business days for the order to be processed and
                  prepared for shipment.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Order Delivery - "Shipped"</h3>
                <p className="text-gray-600 leading-relaxed">
                  Once we have assigned a tracking number to your order, and it has left our
                  warehouse, the order status will appear as "Shipped."
                </p>
              </div>
            </TabsContent>

            <TabsContent
              value="account"
              className="bg-white p-6 rounded-lg shadow-sm space-y-6"
            >
              <div className="text-gray-600 leading-relaxed">
                <p className="mb-4">
                  To register for HealthySkin.com, all you need to provide is your name, email
                  address and password.
                </p>
                <p className="mb-4">To pay the items in your Basket, be sure to sign in.</p>
                <h3 className="text-xl font-semibold mb-2">
                  Changing Your Login Email Address or Password
                </h3>
                <p>
                  You can change your account email address and password on the Profile page. All
                  your orders confirmations will be sent to your new email address.
                </p>
              </div>
            </TabsContent>

            <TabsContent
              value="returns"
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-4">Returns and Exchanges</h3>
              <p className="text-gray-600 leading-relaxed">
                HealthySkin only delivers the best products we have in stock and in each shipment we
                verify that it is in the best conditions, that's why Purchases made in HealthySkin
                store are not eligible for returns and exchanges. HealthySkin reserves the right to
                limit returns or exchanges in all instances.
              </p>
            </TabsContent>
          </div>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
