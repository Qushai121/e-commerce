<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpecialAccess extends Model
{
    use HasFactory;
    public $table = 'special_accesss';
    protected $hidden = ['pivot'];
}
