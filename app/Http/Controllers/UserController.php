<?php

namespace App\Http\Controllers;

use App\Note;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
class UserController extends Controller
{
    //TODO:: User Authentication
    public function login(Request $request)
    {
        $input = $request->only('email', 'password');
        $user = User::where('email',$request->email)->first();
        $token = null;
        if ($user)
        {
            if(!$token = JWTAuth::attempt($input))
            {
                return response()->json([
                    'error' => 'ok',
                    'message' => 'Invalid Password',
                ]);
            }
            else
            {
                //TODO:: if User Store local Storage save any data then into database
                $this->note($request,$user);
                return response()->json([
                    'success' => 'ok',
                    'message' => $token,
                    'name' => $user->name,
                ]);
            }
        }
        else{
            //TODO:: Email Not Found Then Create New Account
            $user = User::create([
                'name'=>Str::ucfirst(Str::before($request->email,'@')),
                'email'=>$request->email,
                'password'=>Hash::make($request->password)
            ]);
            //TODO:: if User Store local Storage save any data then into database
            $this->note($request,$user);
            $token = JWTAuth::attempt($input);
            return response()->json([
                'success' => 'ok',
                'message' => $token,
                'name' => $user->name,
            ]);
        }
    }
    //TODO:: LocalStorage Data Save
    protected function note($request,$user)
    {
        if ($request->has('notes'))
        {
            if($request->notes)
            {
                try {
                    foreach ($request->notes as $note)
                    {
                        Note::create([
                            'note'=>$note,
                            'user_id'=>$user->id
                        ]);
                    }
                }
                catch (\Exception $e){}
            }
        }
    }
    //TODO:: Logout Method
    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate($request->token);

            return response()->json([
                'success' => true,
                'message' => 'User logged out successfully'
            ]);
        } catch (JWTException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, the user cannot be logged out'
            ], 500);
        }
    }
    //TODO:: User Details with Notes
    public function loginUser()
    {
        return User::with('note')->findOrFail(Auth::id());
    }
}
