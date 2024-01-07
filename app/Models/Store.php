<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Store extends Model
{
    use HasFactory;
    public $table = 'stores';

    protected $casts = [
        'updated_at' => 'date:Y-m-d',
        'created_at' => 'date:Y-m-d',
    ];

    // protected $appends = [
    //     'owner',
    // ];

    // protected $hidden = [
    //     'user'
    // ];

    protected $guarded = ['id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    

    // public function getOwnerAttribute()
    // {
    //     if ($this->user) {
    //         $data = [
    //             'owner' => $this->user->name,
    //             'owner_id' => $this->user->id,
    //         ];
    //         return $data;
    //     }
    // }
}
