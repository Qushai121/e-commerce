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
        return self::transactionPay($request->post('quantity'), $product);
    }

    public function productCartTransactionPay(Request $request)
    {
        $datasFromReq = $request->post();
        foreach ($datasFromReq as $data) {
            $product = Product::find($data['product_id']);
            self::transactionPay($data['quantity'], $product);
        }

    }

    private static function transactionPay(int $quantity, Product $product)
    {
        $quantity = $quantity;
        $discount = $product['discount'];
        $discountPerQuantity = $product['price'] - $discount;
        $total_price = $discountPerQuantity * $quantity;

        if ($product->stock <= 0) {
            return to_route('product.detail', $product->id)->with('message', 'stock empty');
        };

        $bankInfo = BankAccount::where('user_id', auth()->user()->id)->first();

        if (!$bankInfo) {
            dd('top up dulu bang di dashboard baru bisa ');
        };

        // find 
        $storeData = $product->with(['store:id,user_id'])->where('id', $product->store_id)->first(['id', 'store_id']);

        if ($bankInfo['balance'] - $total_price < 0) {
            return to_route('cart_product.index')->with('message', 'not enough cash to buy ' . $product['product_name']);
        };

        DB::transaction(function () use ($product, $quantity, $discount, $total_price, $bankInfo, $storeData) {
            // decrease the stock of product
            $product->stock -= $quantity;
            $product->save();

            // decrease balance of buyer balance
            $bankInfo->balance -= $total_price;
            $bankInfo->save();

            // add money to store owner BankAccount
            $ownerStore = BankAccount::where('user_id', $storeData->store->user_id)->first();

            $ownerStore->balance += $total_price;
            $ownerStore->save();

            $data = [
                'product_id' => $product->id,
                'user_id' => auth()->user()->id,
                'discount' => $discount,
                'quantity' => $quantity,
                'total_price' => $total_price,
                'status' => StatusProductTransaction::PAID->value,
            ];

            ProductTransaction::create($data);

            $cart = session('cart.product');
            if (isset($cart[$product->id])) {
                session()->forget("cart.product.$product->id");
            };
        });

        return to_route('product.detail', $product->id);
    }


    public function productInvoiceRender(): Inertia
    {
        return Inertia::render('');
    }
}



// public function productTransactionPay(Request $request, Product $product)
//     {
//         $quantity = $request->post('quantity');
//         $discount = $request->post('discount');
//         $total_price = $request->post('total_price');

//         if ($product->stock <= 0) {
//             return to_route('product.detail', $product->id)->with('message', 'stock empty');
//         };

//         $bankInfo = BankAccount::where('user_id', auth()->user()->id)->first();
//         if (!$bankInfo) {
//             dd('top up dulu bang di dashboard baru bisa ');
//         };

//         // find 
//         $storeData = $product->with(['store:id,user_id'])->where('id', $product->store_id)->first(['id', 'store_id']);

//         if ($bankInfo['balance'] - $total_price < 0) {
//             dd('not enough cash stranger');
//             return to_route('product.detail', $product->id)->with('message', 'not enough cash stranger');
//         };

//         DB::transaction(function () use ($product, $quantity, $discount, $total_price, $bankInfo, $storeData) {
//             // decrease the stock of product
//             $product->stock -= $quantity;
//             $product->save();

//             // decrease balance of buyer balance
//             $bankInfo->balance -= $total_price;
//             $bankInfo->save();

//             // add money to store owner BankAccount
//             $ownerStore = BankAccount::where('user_id', $storeData->store->user_id)->first();

//             $ownerStore->balance += $total_price;
//             $ownerStore->save();

//             $data = [
//                 'product_id' => $product->id,
//                 'user_id' => auth()->user()->id,
//                 'discount' => $discount,
//                 'quantity' => $quantity,
//                 'total_price' => $total_price,
//                 'status' => StatusProductTransaction::PAID->value,
//             ];

//             ProductTransaction::create($data);
//         });

//         return to_route('product.detail', $product->id);
//     }