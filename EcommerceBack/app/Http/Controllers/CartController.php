<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;


class CartController extends Controller
{
    public function getCart(Request $request)
    {
        $userId = $request->user()->id;
        $cartItems = Cart::where('user_id', $userId)->get();


        return response()->json(['cart' => $cartItems]);
    }
    public function addToCart(Request $request)
    {
        // First, we validate the request data.
        $validatedData = $request->validate([
            '*.product_id' => 'required|exists:products,id',
            '*.quantity' => 'required|integer|min:1',
        ]);

        // Loop through the cart items array and add each item to the cart.
        $cartItems = [];
        foreach ($validatedData as $item) {
            $cartItem = Cart::where('user_id', $request->user()->id)
                ->where('product_id', $item['product_id'])
                ->first();

            if ($cartItem) {
                $cartItem->quantity += $item['quantity'];
                $cartItem->save();
            } else {
                $cartItem = Cart::create([
                    'user_id' => $request->user()->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                ]);
            }

            $cartItems[] = $cartItem;
        }

        // Finally, we return a JSON response with the updated cart items.
        return response()->json($cartItems);
    }


    public function updateCartItem($cartItemId, $scope)
    {
        $cartItem = Cart::findOrFail($cartItemId);
        if ($scope == 'inc') {
            $cartItem->quantity += 1;
        } else  if ($scope == 'dec') {
            $cartItem->quantity -= 1;
        }
        $cartItem->save();

        return response()->json($cartItem);
    }

    public function deleteCartItem(Request $request, $cartItemId)
    {
        $cartItem = Cart::findOrFail($cartItemId);
        $cartItem->delete();

        return response()->json(['message' => 'Cart item deleted successfully.']);
    }
}
