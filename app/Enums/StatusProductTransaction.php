<?php

namespace App\Enums;

enum StatusProductTransaction: string
{
    case UNPAID = 'unpaid';
    case PAID = 'paid';
    case PENDING = 'pending';
    case CANCEL = 'cancel';
}
