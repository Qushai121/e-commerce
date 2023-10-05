<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChattingMessage extends Model
{
    use HasFactory;
    protected $table = 'chatting_messages';
    protected $guarded = ['id'];
    
    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class,'message_from_id','id');
    }
}
