<?php

namespace App\Http\Controllers\LandingPage;

use App\Events\MessageCreated;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        MessageCreated::dispatch('halo bang saya ini');
        $products = Product::limit(10)->get(['id', 'product_name', 'image', 'price', 'discount']);
       
        return Inertia::render('LandingPage/Home/IndexHome', compact('products'));
    }

    
}
