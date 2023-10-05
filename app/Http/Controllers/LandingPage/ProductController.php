<?php

namespace App\Http\Controllers\LandingPage;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function detailProduct(Request $request, Product $product)
    {
        $product = $product->with(['store' => function ($q) use($product) {
            $q->select(['id','user_id']);
            $q->where('id','=',$product->store_id);
        }])->first();

        return Inertia::render('LandingPage/Products/DetailProduct', compact('product'));
    }
}
