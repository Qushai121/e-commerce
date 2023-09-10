<?php

namespace App\Enums;

enum Role: string
{
    case Admin = 'admin';
    case StoreOwner = 'store_owner';
    case NormalUser = 'normal_user';
}
