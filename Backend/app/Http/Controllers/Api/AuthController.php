<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Wajib ada ini
use Illuminate\Support\Facades\Hash;
use App\Models\User; // Wajib ada ini

class AuthController extends Controller
{
   public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        /** @var \App\Models\User $user */
        $user = Auth::user(); // Di sini class User mulai "terpakai" secara tidak langsung

        $user->tokens()->delete();
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'success' => true,
            'token' => $token,
            'user' => $user
        ]);
    }

    return response()->json([
        'success' => false,
        'message' => 'Email atau password salah'
    ], 401);
}
}
