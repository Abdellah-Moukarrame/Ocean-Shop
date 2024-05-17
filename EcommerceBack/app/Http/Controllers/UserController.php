<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Auth\Events\Verified;


class UserController extends Controller
{
    public function verify(Request $request, $id, $hash)
    {
        $user = \App\Models\User::where('id', $id)->where('email_verified_hash', $hash)->first();

        if (!$user) {
            return redirect('/login')->with('error', 'Invalid verification link');
        }

        if ($user->hasVerifiedEmail()) {
            return redirect('/login')->with('error', 'Email already verified');
        }

        $user->markEmailAsVerified();

        event(new Verified($user));

        return redirect('/login')->with('success', 'Your email has been verified');
    }
}
