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
        // dd($product);
        $product = $product->with(['store' => function ($q) use($product) {
            $q->select(['id','user_id','store_banner',"store_name"]);
        }])->where("id","=",$product->id)->first();
        // $product = $product->with(['store' => function ($q) use($product) {
        //     $q->select(['id','user_id']);
        //     $q->where('id','=',$product->store_id);
        // }])->first();

        // katanay g papa ke expose dari midtran
        $midtransClientKey = env('MIDTRANS_SERVER_KEY');
        return Inertia::render('LandingPage/Products/DetailProduct', compact('product','midtransClientKey'));
    }
}
