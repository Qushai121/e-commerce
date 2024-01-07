<?php

namespace App\Http\Controllers\ShopOwner;

use App\Http\Controllers\Controller;
use App\Models\ProductTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductTransactionController extends Controller
{
    public function index(Request $request)
    {

        $myStoreNow = $request->session()->get('mystore');


        $datas = ProductTransaction::where('store_id', $myStoreNow)->orderBy('created_at', 'DESC')->with([
            'store' => function ($q) {
                $q->select('id', 'store_name', 'user_id');
                $q->where('user_id', auth()->user()->id);
            },
            'product' => function ($q) {
                $q->select('id', 'product_name', 'image');
            },
            'customer' => function ($q) {
                $q->select('id', 'name');
            }
        ])->paginate(10);

        return Inertia::render('ShopOwner/ProductTransaction/indexProductTransaction', compact('datas'));
    }

    public function updateStatus()
    {
    }
}
