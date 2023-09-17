<?php

use App\Enums\Role;
use App\Http\Controllers\All\BankAccountController;
use App\Http\Controllers\All\CartController;
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
    Route::post('/profile_image', [ProfileController::class, 'updateAvatar'])->name('profile.updateAvatar');
});

// special only for shop owner
Route::middleware('auth', 'role:shop_owner&admin')->prefix('shop_owner')->group(function () {
    Route::resource('product', ProductController::class)->only(['index', 'create', 'store', 'update', 'destroy']);
    Route::resource('store', StoreController::class)->only(['index', 'create', 'store', 'update', 'destroy']);
    Route::post('change_store', ChangeStore::class)->name('change_store');
});

// this is action for Landing page to input some data to db
Route::middleware('auth')->group(function () {

    // for topUp
    Route::controller(BankAccountController::class)->group(function () {
        // view form topUp
        Route::get('topup', 'topUp')->name('topup.index');
        // action for topUp
        Route::post('topup', 'topUpCreate')->name('topup.create');
    });
    // ==========================================================

    // for buying the product
    Route::controller(ProductTransactionController::class)->group(function () {
        Route::post('product/{product}/transaction', 'productTransactionPay')->name('product.transaction.pay')->where([
            'product' => '[0-9]+'
        ]);
        Route::post('product/cart/transaction', 'productCartTransactionPay')->name('product.cart.transaction.pay');
    });
    // ==========================================================

    // for normal user want to become shop owner
    Route::controller(ShopOwnerController::class)->group(function () {
        // view how to become shop owner
        Route::get('become_shop_onwer', 'index')->name('become_shop_owner.index');
        // action to become shop owner
        Route::post('become_shop_onwer', 'store')->name('become_shop_owner.store');
    });
    // ==========================================================

    Route::resource('cart_product', CartController::class);
});

// view for Landing Page of the web
Route::prefix('')->group(function () {
    Route::get('home', [HomeController::class, 'index'])->name('home.index');
    Route::get('product/{product}', [ProductTransactionController::class, 'detailProduct'])->name('product.detail');
});

require __DIR__ . '/auth.php';
