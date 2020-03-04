<?php

namespace App\Http\Controllers;

use App\Note;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;
class UserController extends Controller
{

    public function login(Request $request)
    {
//        return response()->json(['data'=>$request->notes]);
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
                //$accessToken = $user->createToken('authToken')->accessToken;
                if ($request->has('notes'))
                {
                    if($request->notes)
                    {
                        foreach ($request->notes as $note)
                        {
                            Note::create([
                                'note'=>$note,
                                'user_id'=>$user->id
                            ]);
                        }
                    }
                }
                return response()->json([
                    'success' => 'ok',
                    'message' => $token,
                    'name' => $user->name,
                ]);
            }
        }
        else{
            $user = User::create([
                'name'=>Str::ucfirst(Str::before($request->email,'@')),
                'email'=>$request->email,
                'password'=>Hash::make($request->password)
            ]);
            $token = JWTAuth::attempt($input);
            return response()->json([
                'success' => 'ok',
                'message' => $token,
                'name' => $user->name,
            ]);
//            return response()->json([
//                'error' => 'ok',
//                'message' => 'Email Not Found',
//            ]);
        }
    }
    public function logout(Request $request)
    {
//        $a =Auth::user()->token()->revoke();
//        Auth::user()->token()->delete();
//        return response()->json(['message'=>$a]);
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
    public function loginUser()
    {
        return User::with('note')->findOrFail(Auth::id());
//       return $id = JWTAuth::parseToken()->authenticate();
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
