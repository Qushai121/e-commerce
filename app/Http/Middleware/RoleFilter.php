<?php

namespace App\Http\Middleware;

use App\Enums\Role;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleFilter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $roles): Response
    {
        $specialAccess = User::find(auth()->user()->id)->with(['specialAccesss' =>  function ($q) {
            $q->select("permission");
        }])->first('id')->specialAccesss->pluck('permission');

        $role = explode('&', $roles);
        foreach ($specialAccess as $permission) {
            if (!in_array($permission, $role)) {
                return redirect()->back();
            };
        };

        return $next($request);
    }
}
