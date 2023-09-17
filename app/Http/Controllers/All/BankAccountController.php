<?php

namespace App\Http\Controllers\All;

use App\Http\Controllers\Controller;
use App\Models\BankAccount;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BankAccountController extends Controller
{
    public function topUp()
    {
        return Inertia::render('BankAccount/TopUp/IndexTopUp');
    }

    public function topUpCreate(Request $request)
    {
        $validated = $request->validate([
            'balance' => "numeric|required|min:3"
        ], ['balance.min' => "Minimal Top Up $ 3"]);

        $dataBankAccount = User::where('id', auth()->user()->id)->with('BankAccount')->first()['BankAccount'];
        // dd($dataBankAccount);
        if ($dataBankAccount) {
            $balanceUpdate = [
                'balance' => $dataBankAccount['balance'] + $validated['balance']
            ];
            BankAccount::where('id', $dataBankAccount['id'])->update($balanceUpdate);
            return 'update';
        }

        $requestMerge = array_merge(
            $validated,
            ['user_id' => auth()->user()->id],
        );

        BankAccount::create($requestMerge);

        return 'asdsad';
    }
}
