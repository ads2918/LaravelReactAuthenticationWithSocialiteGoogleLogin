<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Redirect;

class EmailVerificationController extends Controller
{
    public function __invoke(EmailVerificationRequest $request)
    {
        $frontend = rtrim(config('app.frontend_url'), '/');

        // fulfill() marks the email verified and fires the Verified event,
        // but is a no-op (still returns true) if already verified.
        $request->fulfill();

        return Redirect::away("{$frontend}/?verified=1");
    }
}
