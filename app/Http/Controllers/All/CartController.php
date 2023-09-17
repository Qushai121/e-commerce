<?php

namespace App\Http\Controllers\All;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cartProducts = [];
        $cartTotalPrice = 0;

        if (session()->get('cart.product') != null) {

            $cartProductIds = array_keys(session()->get('cart.product'));
            $cartProductsFromDb = Product::select('id', 'product_name', 'price', 'image', 'discount', 'store_id', 'stock')->findMany($cartProductIds);

            foreach ($cartProductsFromDb as $cartProduct) {
                $quantity = session()->get("cart.product." . $cartProduct['id'])['quantity'];
                $priceDiscount = $cartProduct['price'] - $cartProduct['discount'];
                $cartProducts[] = array_merge(
                    ['quantity' => $quantity],
                    ['id' => $cartProduct['id']],
                    ['product_name' => $cartProduct['product_name']],
                    ['price' => $cartProduct['price']],
                    ['image' => $cartProduct['image']],
                    ['discount' => $cartProduct['discount']],
                    ['store_id' => $cartProduct['store_id']],
                    ['stock' => $cartProduct['stock']],
                    ['total_price' => $priceDiscount * $quantity]
                );
                $cartTotalPrice += $priceDiscount * $quantity;
            }
        } else {
            $cartProducts = null;
        };

        return Inertia::render('LandingPage/Products/ListCartProduct', compact('cartProducts', 'cartTotalPrice'));
    }

    /**
     * Show the form for creating a new resource.
     */
    // public function create(Request $request)
    // {

    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $cart = session('cart.product');
        $product_id = $request->post('product_id');
        $quantity =  $request->post('quantity');

        $prev_quantity = isset($cart[$product_id]) ? $cart[$product_id]['quantity'] : 0;

        $cart[$product_id] = [
            'quantity' => $prev_quantity + $quantity,
        ];

        session(['cart.product' => $cart]);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $cart = session('cart.product');
        $product_id = $id;
        $quantity =  $request->post('quantity');

        $cart[$product_id] = [
            'quantity' => $quantity,
        ];

        session(['cart.product' => $cart]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        session()->forget("cart.product.$id");
        return redirect()->back();
    }
}
