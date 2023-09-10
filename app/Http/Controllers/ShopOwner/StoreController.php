<?php

namespace App\Http\Controllers\ShopOwner;

use App\Http\Controllers\Controller;
use App\Models\Store;
use App\Http\Requests\StoreStoreRequest;
use App\Http\Requests\UpdateStoreRequest;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $search = $request->get('search');
        $perPage = $request->get('perPage', 10);


        $datasQuery = Store::where('user_id',auth()->user()->id);
        
        $datasQuery->when($search, function ($q) use ($search) {
            $q->where('store_name', 'like', "%$search%")
                ->orWhere('updated_at', 'like', "%$search%")
                ->orWhere('created_at', 'like', "%$search%");
        });


        $datas = $datasQuery->paginate($perPage)->withQueryString();

        return Inertia::render('ShopOwner/Store/IndexStore', compact('datas'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return Inertia::render('ShopOwner/Store/AddStore');
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStoreRequest $request)
    {
        $storeCount = Store::where('user_id', auth()->user()->id)->count();

        $requestMerge = array_merge(
            $request->except('store_banner'),
            ['store_banner' => $request->file('store_banner')],
            ['user_id' => auth()->user()->id],
        );

        $requestMerge['store_banner'] = Storage::disk('public')->put('store_banner', $requestMerge['store_banner']);
        Store::create($requestMerge);
        return redirect()->to(route('store.index'))->with('success', 'Your Store Has Beed Created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Store $store)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Store $store)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStoreRequest $request, Store $store)
    {
        if ($store->user_id != auth()->user()->id) {
            return redirect()->back();
        }
        $requestMerge = array_merge(
            $request->except('store_banner'),
            ['user_id' => auth()->user()->id],
        );

        if ($request->file('store_banner')) {
            Storage::disk('public')->delete('store_banner', $store->store_banner);
            $requestMerge['store_banner'] = Storage::disk('public')->put('store_banner', $request->file('store_banner'));
        }

        try {
            $store->update($requestMerge);
            return redirect()->back()->with('success', 'store has been edit');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['error' => 'store fail to edit']);
        }

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Store $store, Request $request)
    {
        if ($store->user_id != auth()->user()->id) {
            return redirect()->back();
        }

        $myStoreNow = $request->session()->get('mystore');

        if ($myStoreNow == $store->id) {
            $request->session()->forget('mystore');
        };

        Storage::disk('public')->delete('store_banner', $store->store_banner);
        $store->delete();
    }
}
