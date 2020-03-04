<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'auth.jwt'], function () {
    Route::post('logout','UserController@logout');
    Route::get('user-login','UserController@loginUser');
    Route::resource('note','NoteController');
});
Route::post('login','UserController@login');
