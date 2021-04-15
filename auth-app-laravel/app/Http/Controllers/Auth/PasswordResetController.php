<?php

namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Notifications\PasswordResetRequest;
use App\Notifications\PasswordResetSuccess;
use App\Models\User;
use App\Models\PasswordReset;
use Illuminate\Support\Facades\Log;

class PasswordResetController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
        ]);
        $user = User::where('email', $request->email)->first();
        if (!$user)
            return response()->json([
                'message' => 'We can\'t find a user with that e-mail address.'
            ], 404);
        $passwordReset = PasswordReset::updateOrCreate(
            ['email' => $user->email],
            [
                'email' => $user->email,
                'token' => str_random(60)
            ]
        );
        if ($user && $passwordReset)
            $user->notify(
                new PasswordResetRequest($passwordReset->token)
            );
        return response()->json([
            'message' => 'We have e-mailed your password reset link!'
        ]);
    }
    /**
     * Find token password reset
     *
     * @param  [string] $token
     * @return [string] message
     * @return [json] passwordReset object
     */
    public function find($token){
        $passwordReset = PasswordReset::where('token', $token)
            ->first();
        Log::info($token);
        Log::info('token');
        if (!$passwordReset)
            return response()->json([
                'message' => 'This password reset token is invalid. (find)'
            ], 404);
        if (Carbon::parse($passwordReset->updated_at)->addMinutes(720)->isPast()) {
            $passwordReset->delete();
            return response()->json([
                'message' => 'This password reset token is invalid. token expired (find)'
            ], 404);
        }
        // return response()->json($passwordReset);
        return view('reset_view');
    }
     /**
     * Reset password
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @param  [string] token
     * @return [string] message
     * @return [json] user object
     */
    public function reset(Request $request)
    {
        Log::info('in reset');
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|confirmed',
            'token' => 'required|string'
        ]);
        $passwordReset = PasswordReset::where([
            ['token', $request->token],
            ['email', $request->email]
        ])->first();
        if (!$passwordReset)
            return response()->json([
                'message' => 'This password reset token is invalid. (Reset)'
            ], 404);
            // return view('token_error');
        $user = User::where('email', $passwordReset->email)->first();
        if (!$user)
            return response()->json([
                'message' => 'We can\'t find a user with that e-mail address. (Reset)'
            ], 404);
            // return view('email_error');
        bcrypt($request->password);

        // $user = DB::table('users')
        //             ->where('id', 1)
        //             ->update(['email' => $request->email]);

        $user->save();
        $passwordReset->delete();
        $user->notify(new PasswordResetSuccess($passwordReset));



        // return response()->json($user);
        // return view('success');
        return response()->json(
            [
                'success' => true,
                'message' => 'Data inserted successfully'
            ]
        );
    }
    //     public function userUpdate(Request $request)
    // {
    //     $request->validate([
    //         'email' => 'required|string|email',
    //     ]);
    //     Log::info('not loged');
    //     $id = Auth::id();
    //     Log::info($id);

    //     if (Auth::check()) { 
    //         Log::info('Loged in');
                // Get the currently authenticated user's ID...
            // $user = auth()->user();
            // $id = $request->user()->id;
            // $id = auth()->id;
            // $id = Auth::user()->id;
            // $userid = Auth::user();
            // $id = $userid->id;
            // $userid = auth()->user(); 
            // $id = $userid->id;
            // $id = auth('api')->user();
            // $id = auth()->guard('api')->user();

        // auth('api')->user()->id;
        // Log::info(Auth::user());
        //     Log::info($id);
        //     Log::info('ID Error');
        //     Log::info($request->email);
        //     $useremail = DB::table('users')
        //                     ->where('id', $id )
        //                     ->update(['email' => $request->email]);
        // }
    // }

}