<?php

namespace App\Http\Controllers\LandingPage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SpecialAccessController extends Controller
{
    
    public function index(): Response
    {
        return Inertia::render('');
    }
}
