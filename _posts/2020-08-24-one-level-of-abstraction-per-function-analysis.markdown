---
layout: post
title:  "One level of abstraction per function - Simplification"
date:   2020-08-24 16:40:50 +0100
categories: Code Quality
---

Writing code is all about abstractions. Abstraction helps programmers write better and well-designed code.

One of the main principles that every developer needs to follow for tackling down code complexity and avoid code smells is to follow the very basic one named "One level of, abstraction" or better know as "SLA - Single Level of Abstraction."
It's a powerful concept, and like all other powerful concepts, it comes with a price.  If not used well, it can cause damage too. 

The main idea of this principle is to avoid mixing up multiple levels of abstractions in one method. 
As with any other principle, this one is not mandatory for use, but the benefits from following this one are enormous. Following this principle brings benefits, but most important, it can help increase the readability and simplicity of the code.

Excellent code readability and simplicity are often the most difficult to achieve, but always striving for them is priceless for the future of programming.

If followed, this principle ensures that functions are doing one and only one thing, and they do that well.

Even it sounds simple, in reality, this principle can be hard to understand and followed.
 
In the examples below, I will try to simplify this principle in detail.

#### *"Mixing levels of abstraction within a function is always confusing." - Robert C. Martin*

# **Simplification**

Let's try to simplify a couple of examples to help tackle down and understand this principle.


In this example, We will try to explain the principle in the context of order processing, precisely the order shipping feature. Let's do it:

<div>

{% codetabs %}

{% codetab Ruby %}
{% highlight ruby %}
def ship_order
      if @order.get_payment_state === 'paid' && 
          @order.get_shipment_state != 'shipped'
        
        @order.set_as_shipped()
        
        _email_template = 'order_shipped'
        _email_content = @emailTemplateBuilder.build(
            _email_template,
            @order
        ) 
        
        @emailService.notify(
            _email_content,
            Array([@order.get_email()])
        );
        
        _tracking_number = @trackingNumberService.fetch_tracking_number(
            @order
        );
        @order.set_tracking_number(_tracking_number);
        
        @order.save();      
      end
  end
{% endhighlight %}
{% endcodetab %}

{% codetab Php %}
{% highlight php %}
public function shipOrder(): void
{
    if (
        $this->order->getPaymentState() === 'paid' &&
        $this->order->getShipmentState() !== 'shipped'
    ) {
        $this->order->setAsShipped();

        $emailTemplate = 'order_shipped';
        $emailContent = $this->emailTemplateBuilder->build(
            $emailTemplate,
            $this->order
        );

        $this->emailService->notify(
            $emailContent,
            [$this->order->getEmail()]
        );

        $trackingNumber = $this->trackingNumberService->fetchTrackingNumber(
            $this->order
        );

        $this->order->setTrackingNumber($trackingNumber);

        $this->order->save();
    }
}
{% endhighlight %}
{% endcodetab %}

{% codetab Go %}
{% highlight php %}
func ShipOrder(order) {      
    if (order.GetPaymentState == 'paid' && 
          order.GetShipmentState != 'shipped') {          
         order.SetAsShipped()
        
        var emailTemplate = 'order_shipped'
        var emailContent = emailTemplateBuilder.build(
            emailTemplate,
            order
        ) 
        
        emailService.notify(
            emailContent,
            Array([order.GetEmail()])
        );
        
        var trackingNumber = trackingNumberService.FetchTrackingNumber(
            order
        );
        order.SetTrackingNumber(trackingNumber);
        
        order.Save();               
    }
}
{% endhighlight %}
{% endcodetab %}

{% codetab Python %}
{% highlight python %}
def ship_order(self):
    if (self.order.get_payment_state() == 'paid' and
       self.order.get_shipment_state() != 'shipped'):
        self.order.set_as_shipped()

        _email_template = 'order_shipped'
        _email_content = self.email_template_builder.build(
            _email_template,
            self.order
        )

        self.email_service.notify(
            _email_content,
            self.order.get_email()
        )

        _tracking_number = self.tracking_number_service.fetch_tracking_number(
            self.order
        )
        self.order.set_tracking_number(_tracking_number)

        self.order.save()
{% endhighlight %}
{% endcodetab %}

{% codetab Nodejs %}
{% highlight js %}
shipOrder() {
    if (
        this.order.getPaymentState() === 'paid' && 
        this.order.getShipmentState() !== 'shipped'
    ) {           
        this.order.setAsShipped();
        
        const emailTemplate = 'order_shipped';
        const emailContent = this.emailTemplateBuilder.build(
            emailTemplate,
            this.order
        ); 
        this.emailService.notify(
            emailContent,
            this.order.getEmail()
        );
        
        const trackingNumber = this.trackingNumberService.fetchTrackingNumber(
            this.order
        );
        this.order.setTrackingNumber(trackingNumber);
        
        this.order.save();    
    }
}
{% endhighlight %}
{% endcodetab %}


{% codetab Java %}
{% highlight java %}
public void shipOrder(order) 
{
    if (
        order.getPaymentState() === 'paid' &&
        order.getShipmentState() !== 'shipped'
    ) {
        order.setAsShipped();

        String emailTemplate = 'order_shipped';
        String emailContent = emailTemplateBuilder.build(
            emailTemplate,
            order
        );
        emailService.notify(
            emailContent,
            order.getEmail()
        );

        String trackingNumber = trackingNumberService.fetchTrackingNumber(
            order
        );
        order.setTrackingNumber(trackingNumber);

        order.save();
    }
}
{% endhighlight %}
{% endcodetab %}

{% codetab C# %}
{% highlight csharp %}
void shipOrder(Order order) 
{
    if (
        order.getPaymentState() == "paid" &&
        order.getShipmentState() != "shipped"
    ) {
        order.setAsShipped();

        string emailTemplate = "order_shipped";
        string emailContent = emailTemplateBuilder.build(
            emailTemplate,
            order
        );
        emailService.notify(
            emailContent,
            order.getEmail()
        );

        string trackingNumber = trackingNumberService.fetchTrackingNumber(
            order
        );
        order.setTrackingNumber(trackingNumber);

        order.save();
    }
}
{% endhighlight %}
{% endcodetab %}

{% endcodetabs %}
</div>

<div style="text-align: right; position: relative; padding-bottom: 10px">
    <button class="button" style="position: absolute; right: 0; top: -31px;" uk-toggle="target: #bad-example-1" type="button">View full code</button>
</div>
<div id="bad-example-1" hidden>
<div>

{% codetabs %}

{% codetab Ruby %}
{% highlight ruby %}
def ship_order
      if @order.get_payment_state === 'paid' && 
          @order.get_shipment_state != 'shipped'
        
        @order.set_as_shipped()
        
        _email_template = 'order_shipped'
        _email_content = @emailTemplateBuilder.build(
            _email_template,
            @order
        ) 
        
        @emailService.notify(
            _email_content,
            Array([@order.get_email()])
        );
        
        _tracking_number = @trackingNumberService.fetch_tracking_number(
            @order
        );
        @order.set_tracking_number(_tracking_number);
        
        @order.save();      
      end
  end
{% endhighlight %}
{% endcodetab %}

{% codetab Php %}
{% highlight php %}
public function shipOrder(): void
{
    if (
        $this->order->getPaymentState() === 'paid' &&
        $this->order->getShipmentState() !== 'shipped'
    ) {
        $this->order->setAsShipped();

        $emailTemplate = 'order_shipped';
        $emailContent = $this->emailTemplateBuilder->build(
            $emailTemplate,
            $this->order
        );

        $this->emailService->notify(
            $emailContent,
            [$this->order->getEmail()]
        );

        $trackingNumber = $this->trackingNumberService->fetchTrackingNumber(
            $this->order
        );

        $this->order->setTrackingNumber($trackingNumber);

        $this->order->save();
    }
}
{% endhighlight %}
{% endcodetab %}

{% codetab Go %}
{% highlight php %}
func ShipOrder(order) {      
    if (order.GetPaymentState == 'paid' && 
          order.GetShipmentState != 'shipped') {          
         order.SetAsShipped()
        
        var emailTemplate = 'order_shipped'
        var emailContent = emailTemplateBuilder.build(
            emailTemplate,
            order
        ) 
        
        emailService.notify(
            emailContent,
            Array([order.GetEmail()])
        );
        
        var trackingNumber = trackingNumberService.FetchTrackingNumber(
            order
        );
        order.SetTrackingNumber(trackingNumber);
        
        order.Save();               
    }
}
{% endhighlight %}
{% endcodetab %}

{% codetab Python %}
{% highlight python %}
def ship_order(order):
    if (order.get_payment_state() == 'paid' and
       order.get_shipment_state() != 'shipped'):
        order.set_as_shipped()

        _email_template = 'order_shipped'
        _email_content = self.email_template_builder.build(
            _email_template,
            order
        )

        self.email_service.notify(
            _email_content,
            order.get_email()
        )

        _tracking_number = self.tracking_number_service.fetch_tracking_number(
            order
        )
        order.set_tracking_number(_tracking_number)

        order.save()

{% endhighlight %}
{% endcodetab %}

{% codetab Nodejs %}
{% highlight js %}
shipOrder() {
    if (
        this.order.getPaymentState() === 'paid' && 
        this.order.getShipmentState() !== 'shipped'
    ) {           
        this.order.setAsShipped();
        
        const emailTemplate = 'order_shipped';
        const emailContent = this.emailTemplateBuilder.build(
            emailTemplate,
            this.order
        ); 
        this.emailService.notify(
            emailContent,
            this.order.getEmail()
        );
        
        const trackingNumber = this.trackingNumberService.fetchTrackingNumber(
            this.order
        );
        this.order.setTrackingNumber(trackingNumber);
        
        this.order.save();    
    }
}
{% endhighlight %}
{% endcodetab %}


{% codetab Java %}
{% highlight java %}
public void shipOrder(order) 
{
    if (
        order.getPaymentState() === 'paid' &&
        order.getShipmentState() !== 'shipped'
    ) {
        order.setAsShipped();

        String emailTemplate = 'order_shipped';
        String emailContent = emailTemplateBuilder.build(
            emailTemplate,
            order
        );
        emailService.notify(
            emailContent,
            order.getEmail()
        );

        String trackingNumber = trackingNumberService.fetchTrackingNumber(
            order
        );
        order.setTrackingNumber(trackingNumber);

        order.save();
    }
}
{% endhighlight %}
{% endcodetab %}

{% codetab C# %}
{% highlight csharp %}
void shipOrder(Order order) 
{
    if (
        order.getPaymentState() == "paid" &&
        order.getShipmentState() != "shipped"
    ) {
        order.setAsShipped();

        string emailTemplate = "order_shipped";
        string emailContent = emailTemplateBuilder.build(
            emailTemplate,
            order
        );
        emailService.notify(
            emailContent,
            order.getEmail()
        );

        string trackingNumber = trackingNumberService.fetchTrackingNumber(
            order
        );
        order.setTrackingNumber(trackingNumber);

        order.save();
    }
}
{% endhighlight %}
{% endcodetab %}

{% endcodetabs %}
</div>
</div>

The code above makes it crystal clear that the method used for shipping orders is doing a lot.
In other words, it has multiple levels of abstractions inside method implementation.

Points reconsidered as levels of abstractions that need extraction out from the ship order method:

   - Details of the code that is responsible for checking if the order is ready for shipping.
   - Builds the email template needed for shipped order notification.
   - Fires notification from inside the method.
   - Fetch and attach the tracking number to the order.  

Let's do the work and apply this principle to improve the method.

<div>
{% codetabs %}

{% codetab Ruby %}
{% highlight ruby %}
def ship_order
  if (self.order_not_shippable())
      return;
  end

  @order.set_as_shipped()

  self.notify_customer();
  self.track_order();

  @order.save();
end

def order_not_shippable
  return  (@order.get_payment_state != 'paid' || @order.get_shipment_state == 'shipped')
end

def notify_customer
  _email_template = 'order_shipped'
  _email_content = @emailTemplateBuilder.build(
      _email_template,
      @order
  )

  @emailService.notify(
      $emailContent,
      Array([@order.get_email()])
  )
end

def track_order
  _tracking_number = @trackingNumberService.fetch_tracking_number(
      @order
  )

  @order.set_tracking_number(_tracking_number)
end
{% endhighlight %}
{% endcodetab %}

{% codetab Php %}
{% highlight php %}
public function shipOrder(): void
{
    if ($this->orderNotShippable()) {
        return;
    }

    $this->order->setAsShipped();

    $this->notifyCustomer();
    $this->trackOrder();

    $this->order->save();
}

private function orderNotShippable(): bool
{
    return  $this->order->getPaymentState !== 'paid' ||
            $this->order->getShipmentState === 'shipped';
}

private function notifyCustomer(): void
{
    $emailTemplate = 'order_shipped';
    $emailContent = $this->emailTemplateBuilder->build(
        $emailTemplate,
        $this->order
    );

    $this->emailService->notify(
        $emailContent,
        [$this->order->getEmail()]
    );
}

private function trackOrder(): void
{
    $trackingNumber = $this->trackingNumberService->fetchTrackingNumber(
        $this->order
    );

    $this->order->setTrackingNumber($trackingNumber);
}
{% endhighlight %}
{% endcodetab %}

{% codetab Go %}
{% highlight php %}
func ShipOrder(order) {
    if (OrderNotShippable(order)) {
        return
    }

    order.SetAsShipped();

    notifyCustomer(order);
    trackOrder(order);

    order.Save();
}

func OrderNotShippable(order) {
    return  order.GetPaymentState != 'paid' ||
            order.GetShipmentState == 'shipped';
}

func notifyCustomer(order) {
    var emailTemplate = 'order_shipped'
    var emailContent = emailTemplateBuilder.build(
        emailTemplate,
        order
    );

    emailService.notify(
        emailContent,
        Array([order.GetEmail()])
    );
}

func trackOrder(order) {
    var trackingNumber = trackingNumberService.FetchTrackingNumber(
        order
    );

    order.SetTrackingNumber(trackingNumber);
}
{% endhighlight %}
{% endcodetab %}

{% codetab Python %}
{% highlight python %}
def ship_order(order):
    if (order_not_shippable()):
        return

    order.set_as_shipped()

    notify_customer(order)
    track_order(order)

    order.save()

def order_not_shippable(order):
    return  order.get_payment_state() != 'paid' or order.get_shipment_state() == 'shipped'

def notify_customer(order)
    _email_template = 'order_shipped'
    _email_content = self.email_template_builder.build(
        _email_template,
        order
    )

    self.email_service.notify(
        _email_content,
        order.get_email()
    )

def track_order()
    _tracking_number = self.tracking_number_service.fetch_tracking_number(
        order
    )
    order.set_tracking_number(_tracking_number)
{% endhighlight %}
{% endcodetab %}

{% codetab Nodejs %}
{% highlight js %}
shipOrder(order) {
    if (orderNotShippable(order)) {
        return;
    }

    order.setAsShipped();

    notifyCustomer(order);
    trackOrder(order);

    order.save();
}

orderNotShippable(order)
{
    return  order.getPaymentState === 'paid' &&
            order.getShipmentState !== 'shipped';
}

notifyCustomer(order)
{
    const emailTemplate = 'order_shipped';
    const emailContent = this.emailTemplateBuilder.build(
        emailTemplate,
        order
    );

    this.emailService.notify(
        emailContent,
        order.getEmail()
    );
}

trackOrder(order)
{
    const trackingNumber = this.trackingNumberService.fetchTrackingNumber(
        order
    );

    order.setTrackingNumber(trackingNumber);
}
{% endhighlight %}
{% endcodetab %}


{% codetab Java %}
{% highlight java %}
public void shipOrder()
{
    if (orderNotShippable()) {
        return;
    }

    order.setAsShipped();

    notifyCustomer();
    trackOrder();

    order.save();
}

private boolean orderNotShippable()
{
    return order.getPaymentState() == "paid" &&
           order.getShipmentState() != "shipped";
}

private void notifyCustomer()
{
    String emailTemplate = "order_shipped";
    String emailContent = emailTemplateBuilder.build(
        emailTemplate,
        order
    );

    emailService.notify(
        emailContent,
        order.getEmail()
    );
}

private void trackOrder()
{
    String trackingNumber = trackingNumberService.fetchTrackingNumber(
        order
    );

    order.setTrackingNumber(trackingNumber);
}
{% endhighlight %}
{% endcodetab %}

{% codetab C# %}
{% highlight csharp %}
void shipOrder(Order order)
{
    if (orderNotShippable()) {
        return
    }

    order.setAsShipped();

    notifyCustomer(order);
    trackOrder(order);

    order.save();
}

boolean orderNotShippable(Order order)
{
    return  order.getPaymentState() != 'paid' ||
            order.getShipmentState() == 'shipped';
}

void notifyCustomer(Order order)
{
    string emailTemplate = 'order_shipped';
    string emailContent = emailTemplateBuilder.build(
        emailTemplate,
        order
    );
    emailService.notify(
        emailContent,
        order.getEmail()
    );
}

void trackOrder(Order order)
{
    string trackingNumber = trackingNumberService.fetchTrackingNumber(
        order
    );

    order.setTrackingNumber(trackingNumber);
}
{% endhighlight %}
{% endcodetab %}

{% endcodetabs %}
</div>

It looks so much better!

So let's close look at what we have done to improve this method. 

Every line now in ship method is no more detailed than other lines. That means they are all on the same level of abstraction.
