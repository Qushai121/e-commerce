<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductTransaction extends Model
{
    use HasFactory;
    public $table = 'product_transactions';
    
    protected $guarded = ['id'];
}
