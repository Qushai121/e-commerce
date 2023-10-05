<?php

namespace App\Http\Middleware;

use App\Models\Role;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                'roles' => $request->user() ?
                    User::select('id')->find($request->user()->id)->load(['specialAccesss' => function ($q) {
                        $q->select('permission');
                        
                    }])->setAppends([])->setHidden(['pivot'])->toArray()
                    : null
            ],
            'mystores' => [
                'stores' => Store::when($request->user()?->id)->where('user_id', $request->user()?->id)->get(['store_name', 'id']),
                'chosenStore' => $request->session()->get('mystore') ?: null,
                // 'chosenStore' => $request->session()->get('mystore') ?: Stores::when(auth()->user()?->id)->where('user_id', auth()->user()?->id)->first(['id'])['id'] ,
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'flash' => [
                'message' => session('message'),
                'success' => session('success'),
                'error' => session('error'),
            ]
        ]);
    }
}
