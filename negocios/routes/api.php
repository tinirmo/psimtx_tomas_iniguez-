<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\DefaultController;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('obtenerintereses', [DefaultController::class, 'obtenerIntereses']);
Route::get('obtenerusuarioscomunes', [DefaultController::class, 'obtenerUsuariosComunes']);
Route::post('login', [DefaultController::class, 'login']);
Route::post('guardarusuario', [DefaultController::class, 'guardarUsuario']);
Route::put('modificarusuario/{id_usuario}', [DefaultController::class, 'modificarUsuario']);
Route::delete('eliminarusuario/{id_usuario}', [DefaultController::class, 'eliminarUsuario']);

