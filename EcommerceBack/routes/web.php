<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return ['Laravel' => app()->version()];
    /*  $order = (object) [
        'id' => 12345,
        'tracking_no' => 'ABC123'
    ];

    $orderItems = [
        (object) [
            'product' => (object) [
                'name' => 'Product 1',
                'price' => 5600,
            ],
        ],
        (object) [
            'product' => (object) [
                'name' => 'Product 2',
                'price' => 5600,
            ],
        ],
        // Add more order items as needed
    ];

    return view('emails.order-approved', compact(
        'order',
        'orderItems'
    )); */
});

require __DIR__ . '/auth.php';
