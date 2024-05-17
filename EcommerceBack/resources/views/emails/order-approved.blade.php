<!DOCTYPE html>
<html>
<head>
    <title>Order Approved</title>
</head>
<body>
    <h1>THANKS FOR SHOPPING AT SHOECIETY</h1>
    <div >
        <div class=" bg-black">
           <p>Tracking No. {{ $order->tracking_no }}</p>
        </div>
   
    </div>
   <hr>
   <h3>Order Summary </h3>
<hr>
    <div>
       <table style="width: 100%;">
    <thead>
        <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
        </tr>
    </thead>
    <tbody>
        @php
        $total = 0;
        @endphp
        @foreach ($orderItems as $orderItem)
        <tr>
            
           
            <td>{{ $orderItem->product->name }}</td>
            <td>MAD{{ $orderItem->product->price }}</td>
            <td>{{ $orderItem->qty }}</td>
        </tr>
        @php
       $total += $orderItem->qty * $orderItem->product->price;
        @endphp
        @endforeach
    </tbody>
</table>

    </div>
  <div>
    <p>Total: MAD{{ $total }}</p>
      </div>

    <!-- Add more order details as needed -->

    <p style="
    text-align: center;
    ">Thank you for your purchase!</p>

</body>
</html>

