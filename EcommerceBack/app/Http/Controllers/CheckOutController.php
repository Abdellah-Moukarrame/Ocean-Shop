<?php

namespace App\Http\Controllers;

use App\Mail\OrderApproved;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItems;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class CheckOutController extends Controller
{
    public function getOrder()

    {
        $orders = Order::all();

        return response()->json([
            'data' => $orders
        ]);
    }
    public function show($id)

    {
        $orders = Order::find($id);

        if (!$orders) {
            return response()->json([
                'orders' => 'Product not found',
            ], 404);
        }

        return response()->json([
            'order' => $orders
        ]);
    }

    public function userOrder(Request $request)
    {
        $userId = $request->user()->id;
        $orders = Order::where('user_id', $userId)->get();

        return response()->json(['orders' => $orders]);
    }

    public function placeorder(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'address' => 'required',
            'email' => 'required',
            'number' => 'required',
            'barangay' => 'required',
            'city' => 'required',
            'postal' => 'required|numeric',

        ]);

        $user_id = $request->user()->id;

        $order = new Order();
        $order->user_id = $user_id;
        $order->name = $validatedData['name'];
        $order->address = $validatedData['address'];
        $order->email = $validatedData['email'];
        $order->number = $validatedData['number'];
        $order->barangay = $validatedData['barangay'];
        $order->city = $validatedData['city'];
        $order->postal = $validatedData['postal'];


        $order->payment_mode = "COD";
        $order->tracking_no = rand(111111, 999999);
        $order->save();

        $cart = Cart::where('user_id', $user_id)->get();

        $orderItems = [];
        foreach ($cart as $item) {
            $orderItems[] = [
                'product_id' => $item->product_id,
                'qty' => $item->quantity,
                'price' => $item->product->price,
            ];
            $item->product->update([
                'qty' => $item->product->qty - $item->quantity
            ]);
        }

        $order->orderItems()->createMany($orderItems);

        Cart::destroy($cart);
    }

    public function update(Request $request, $order_id)
    {
        $validatedData = $request->validate([
            'status' => 'required',
        ]);
        $orderItems = OrderItems::where('order_id', $order_id)->with('product')->get();
        $order = Order::findOrFail($order_id);
        $order->status = $validatedData['status'];
        $order->save();

        if ($order->status === 'approve') {
            $this->sendOrderApprovedEmail($order, $orderItems);
        }
    }

    public function sendOrderApprovedEmail(Order $order, $orderItems)
    {
        Mail::to($order->email)->send(new OrderApproved($order, $orderItems));

        $order->save();
    }
}
