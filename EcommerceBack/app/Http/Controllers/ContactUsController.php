<?php

namespace App\Http\Controllers;

use App\Mail\ContactEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactUsController extends Controller
{
    public function contact(Request $request)
    {
        // Validate form inputs
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'message' => 'required',
        ]);

        // Prepare email data
        $emailData = [
            'name' => $request->name,
            'email' => $request->email,
            'message' => $request->message,
        ];

        // Send email to admin
        Mail::to('wrznmbl10@gmail.com')->send(new ContactEmail($emailData));

        // Redirect back with success message
        return redirect()->back()->with('success', 'Your message has been sent successfully.');
    }
}
