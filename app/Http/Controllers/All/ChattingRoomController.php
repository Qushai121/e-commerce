<?php

namespace App\Http\Controllers\All;

use App\Events\MessageCreated;
use App\Http\Controllers\Controller;
use App\Models\ChattingMessage;
use App\Models\ChattingRoom;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChattingRoomController extends Controller
{
    /**
     * 
     */
    public function createRoom(Request $request)
    {
        $res =  ChattingRoom::firstOrCreate([
            'shop_owner_id' => $request->post('shop_owner_id '),
            'customer_id' => $request->post('customer_id'),
        ]);

        return to_route('chatting_room', $res->id);
    }




    /**
     * 
     */
    public function chatRoom(ChattingRoom $chattingRoom)
    {
        $shopOwner = User::select(['id', 'name', 'avatar'])->find($chattingRoom->shop_owner_id);
        $customer = User::select(['id', 'name', 'avatar'])->find($chattingRoom->customer_id);

        $messages = $chattingRoom->with(['messages.user'])->where('id', $chattingRoom->id)->first();
        if ($messages->shop_owner_id !== auth()->user()->id && $messages->customer_id !== auth()->user()->id) {
            return redirect()->back();
        };

        return Inertia::render('Chatting/ChattingRoom', compact('messages', 'shopOwner', 'customer'));
    }

    /**
     * 
     */
    public function createdMessage(Request $request)
    {
        $res = ChattingMessage::create($request->post());

        // dd($res);
        $messages = ChattingMessage::where('id', $res->id)->with(['user' => function ($q) {
            $q->select('id', 'name', 'avatar');
        }])->first();

        // $messages = ChattingRoom::with(['messages.user'])->where('id', $request->post('chatting_room_id'))->first();

        // event(new  MessageCreated($messages, $request->post('chatting_room_id')));
        MessageCreated::dispatch(
            $messages,
            $request->post('chatting_room_id')
        );

        return redirect()->back();
    }

    /**
     * 
     */
    public function listRoom()
    {
    }
}
