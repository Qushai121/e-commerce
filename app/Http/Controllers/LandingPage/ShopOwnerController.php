<?php

namespace App\Http\Controllers\LandingPage;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

// shopownwer can make store and selling products
class ShopOwnerController extends Controller
{
    /**
     * view in LandingPage how to become shop owner
     * @return Response
     **/
    public function index(): Response
    {
        return Inertia::render('LandingPage/ShopOwner/IndexShopOwner');
    }

    /**
     * User Become Shop owner
     * 
     * User get shop owner roles by clicking the button on landing page
     * and then user can go to private shop owner dashboard
     * 
     **/
    public function store()
    {
        $user = auth()->user();
        $specialAccessId = 1;

        Role::firstOrCreate(
            [
                'user_id' => $user->id,
                'special_access_id' => $specialAccessId,
            ]
        );

        return to_route('store.create');
    }
}
