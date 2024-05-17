<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckOutController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/user/count', function (Request $request) {
        $adminCount = User::where('is_admin', '=', 1)->count();
        $userCount = User::where('is_admin', '=', 0)->count();
        return response()->json(['adminCount' => $adminCount, 'userCount' => $userCount]);
    });
});

Route::prefix('cart')->group(function () {
    Route::get('/', [CartController::class, 'getCart']);
    Route::post('/', [CartController::class, 'addToCart']);
    Route::put('/{cart_item_id}/{scope}', [CartController::class, 'updateCartItem']);
    Route::delete('/{cart_item_id}', [CartController::class, 'deleteCartItem']);
});



Route::middleware(['admin'])->group(function () {
    Route::post('/products', [ProductController::class, 'store']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::post('/products/{id}/update', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
    Route::get('/order', [CheckOutController::class, 'getOrder']);
    Route::get('/order/{id}', [CheckOutController::class, 'show']);
});

Route::get('/products', [ProductController::class, 'index']);
Route::get('/product/count', [ProductController::class, 'countProducts']);
Route::get('/products/{id}/info', [ProductController::class, 'show']);
Route::get('/orders', [CheckOutController::class, 'userOrder']);

Route::post('/placeorder', [CheckOutController::class, 'placeorder']);
Route::put('/placeorder/{order_id}', [CheckOutController::class, 'update']);
Route::post('/contact', [ContactUsController::class, 'contact']);
