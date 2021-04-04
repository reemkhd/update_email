<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\PasswordResetController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {return view('welcome');});
// Route::get('find/{token}', [PasswordResetController::class, 'find']);
// Route::patch('reset', [PasswordResetController::class, 'reset']);
// Route::post('/home','HomeController@profileUpdate')->name('profileupdate');
// Route::post('profile', [PasswordResetController::class, 'profile']);