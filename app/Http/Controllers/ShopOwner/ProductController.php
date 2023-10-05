<?php

namespace App\Http\Controllers\ShopOwner;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $myStoreNow = $request->session()->get('mystore');
        $search = $request->get('search');
        $perPage = $request->get('perPage', 10);

        $datasQuery = Product::where('store_id', $myStoreNow);

        $datasQuery->when($search, function ($q) use ($search) {
            $q->where(function ($query) use ($search) {
                $query->orWhere('product_name', 'like', "%$search%")
                    ->orWhere('category', 'like', "%$search%")
                    ->orWhere('price', 'like', "%$search%")
                    ->orWhere('discount', 'like', "%$search%")
                    ->orWhere('release_date', 'like', "%$search%")
                    ->orWhere('updated_at', 'like', "%$search%")
                    ->orWhere('created_at', 'like', "%$search%");
            });
        });

        $datas = $datasQuery->paginate($perPage);

        return Inertia::render('ShopOwner/Product/IndexProduct', compact('datas'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('ShopOwner/Product/AddProduct');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        // dd($request->session()->get('mystore'));
        $requestMerge = array_merge(
            $request->except('image'),
            ['image' => $request->file('image')],
            ['store_id' => $request->session()->get('mystore')],
        );

        $requestMerge['image'] = Storage::disk('public')->put('product_image', $requestMerge['image']);
        Product::create($requestMerge);

        return to_route('product.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        // if ($product->user_id != auth()->user()->id) {
        //     return redirect()->back();
        // }
        // dd($request->file('image'));
        $requestMerge = array_merge(
            $request->except('image'),
            ['store_id' => $request->session()->get('mystore')],
        );

        if ($request->file('image')) {
            Storage::disk('public')->delete('product_image', $product->image);
            $requestMerge['image'] = Storage::disk('public')->put('product_image', $request->file('image'));
        }

        try {
            $product->update($requestMerge);
            return redirect()->back()->with('success', 'pro$product has been edit');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['error' => 'pro$product fail to edit']);
        }

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        Storage::disk('public')->delete('product_image', $product->image);
        $product->delete();
        return redirect()->back();
    }
}
