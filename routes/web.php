<?php

use App\Enums\Role;
use App\Http\Controllers\All\BankAccountController;
use App\Http\Controllers\LandingPage\HomeController;
use App\Http\Controllers\LandingPage\ShopOwnerController;
use App\Http\Controllers\ShopOwner\ChangeStore;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShopOwner\ProductController;
use App\Http\Controllers\ShopOwner\StoreController;
use App\Http\Controllers\Transaction\ProductTransactionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


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
    return redirect()->to(route('home.index'));
});

Route::get('/dashboard', function () {
    // return 'asdasdsa';
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth', 'role:shop_owner&admin')->prefix('shop_owner')->group(function () {
    Route::resource('product', ProductController::class);
    Route::resource('store', StoreController::class);
    Route::post('change_store', ChangeStore::class)->name('change_store');
});

Route::middleware('auth', 'role:shop_owner&admin')->group(function () {
    Route::controller(BankAccountController::class)->group(function () {
        Route::get('topup', 'topUp')->name('topup.index');
        Route::post('topup', 'topUpCreate')->name('topup.create');
    });

    Route::controller(ProductTransactionController::class)->group(function () {
        Route::post('product/{product}/transaction', 'productTransactionPay')->name('product.transaction.pay');
    });
});

Route::prefix('')->group(function () {
    Route::get('home', [HomeController::class, 'index'])->name('home.index');
    Route::get('product/{product}', [ProductTransactionController::class, 'detailProduct'])->name('product.detail');

    Route::controller(ShopOwnerController::class)->group(function () {
        Route::get('become_shop_onwer','index')->name('become_shop_owner.index');
        Route::post('become_shop_onwer','store')->name('become_shop_owner.store');
    });
});

require __DIR__ . '/auth.php';
