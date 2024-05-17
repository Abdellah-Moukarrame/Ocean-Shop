<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Products::all();

        return response()->json([
            'data' => $products
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|unique:products',
            'description' => 'required',
            'price' => 'required|numeric',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'category' => 'required',
            'qty' => 'required',
            'listing' => 'required'
        ]);

        $product = new Products();

        $product->name = $validatedData['name'];
        $product->description = $validatedData['description'];
        $product->price = $validatedData['price'];
        $product->qty = $validatedData['qty'];
        $product->category = $validatedData['category'];
        $product->listing = $validatedData['listing'];

        $imagePath = $request->file('image')->store('/public/images');
        $product->image = Storage::url($imagePath);

        $product->save();

        return response()->json([
            'message' => 'Product created successfully',
            'data' => $product,
        ], 201);
    }

    public function show($id)
    {
        $product = Products::find($id);

        if (!$product) {
            return response()->json([
                'message' => 'Product not found',
            ], 404);
        }

        return response()->json([
            'data' => $product
        ]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'qty' => 'required',
            'category' => 'required',
            'listing' => 'required'
        ]);

        $product = Products::find($id);

        if (!$product) {
            return response()->json([
                'message' => 'Product not found',
            ], 404);
        }

        $product->name = $validatedData['name'];
        $product->description = $validatedData['description'];
        $product->price = $validatedData['price'];
        $product->qty = $validatedData['qty'];
        $product->category = $validatedData['category'];
        $product->listing = $validatedData['listing'];

        if ($request->hasFile('image')) {
            $oldImagePath = str_replace('/storage', 'public', $product->image);
            if (Storage::exists($oldImagePath)) {
                Storage::delete($oldImagePath);
            }
            $imagePath = $request->file('image')->store('public/images');
            $product->image = Storage::url($imagePath);
        }

        $product->save();

        return response()->json([
            'message' => 'Product updated successfully',
            'data' => $product,
        ], 200);
    }

    public function destroy($id)
    {
        $product = Products::find($id);

        if (!$product) {
            return response()->json([
                'message' => 'Product not found',
            ], 404);
        }

        Storage::delete($product->image);

        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully',
        ], 200);
    }

    public function countProducts()
    {
        $count = Products::count();

        return response()->json([
            'count' => $count
        ]);
    }
}
