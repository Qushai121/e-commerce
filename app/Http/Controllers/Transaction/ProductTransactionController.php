<?php

namespace App\Http\Controllers\Transaction;

use App\Enums\StatusProductTransaction;
use App\Http\Controllers\Controller;
use App\Models\BankAccount;
use App\Models\Product;
use App\Models\ProductTransaction;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductTransactionController extends Controller
{
    public function detailProduct(Request $request, Product $product)
    {
        return Inertia::render('LandingPage/Products/DetailProduct', compact('product'));
    }

    public function productTransactionPay(Request $request, Product $product)
    {
        $quantity = $request->post('quantity');
        $discount = $request->post('discount');
        $total_price = $request->post('total_price');

        if ($product->stock <= 0) {
            return to_route('product.detail', $product->id)->with('message', 'stock empty');
        };
        // dd(auth()->user()->balance);
        $bankInfo = BankAccount::where('user_id', auth()->user()->id)->first();
        if(!$bankInfo){
            dd('top up dulu bang di dashboard baru bisa ');
        };
        // $store = Store::where('product_id', $product->id)->first('user_id');

        $storeData = $product->with(['store:id,user_id'])->first('store_id');
        // dd($bankInfo->first()->balance);
        if ($bankInfo['balance'] - $total_price < 0) {
            dd('not enough cash stranger');
            return to_route('product.detail', $product->id)->with('message', 'not enough cash stranger');
        };

        DB::transaction(function () use ($product, $quantity, $discount, $total_price, $bankInfo, $storeData) {
            $product->stock -= $quantity;
            $product->save();
            // decrease the stock of product

            $bankInfo->balance -= $total_price;
            $bankInfo->save();
            // decrease balance of buyer balance

            $ownerStore = BankAccount::find($storeData->store->user_id)->first();
            $ownerStore->balance += $total_price;
            $ownerStore->save();
            // add money to store owner BankAccount

            $data = [
                'product_id' => $product->id,
                'user_id' => auth()->user()->id,
                'discount' => $discount,
                'quantity' => $quantity,
                'total_price' => $total_price,
                'status' => StatusProductTransaction::PAID->value,
            ];

            ProductTransaction::create($data);
        });


        dd('comeback anytime');
        return to_route('product.detail', $product->id);
    }

    public function productInvoiceRender(): Inertia
    {
        return Inertia::render('');
    }
}
