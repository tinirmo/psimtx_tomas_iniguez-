<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

use App\Models\Intereses;
use App\Models\Usuarios;
use App\Models\RelUsuariosIntereses;


class DefaultController extends Controller {

	public function login(Request $request){
		try {
			$email     = $request->email;
			$password  = $request->password;
			if($email && $password){
			   if(Usuarios::where('email', $email)->exists()){
				   $oUsuarios = Usuarios::where('email', $email)->first();
				   if(Hash::check($password, $oUsuarios->password)){
					   if($oUsuarios->id_estado == 1){
						$resultado = ['id'=> $oUsuarios->id, 'id_perfil'=> $oUsuarios->id_perfil, 'id_estado'=> $oUsuarios->id_estado, 'nombre'=> $oUsuarios->nombre, 'email'=> $oUsuarios->email];   
						return response()->json([ 'estado'=> true, 'resultado'=>  $resultado ], 200);
					   }
					   return response()->json([ 'estado'=> false, 'mensaje'=> 'No tienes los permisos para acceder.'], 200);
				   }
				   return response()->json([ 'estado'=> false, 'mensaje'=> 'Password  esta mal escrita.'], 200);
			   }
			   return response()->json([ 'estado'=> false, 'mensaje'=> 'Email esta mal escrito.'], 200);
			}
			return response()->json([ 'estado'=> false, 'mensaje'=> 'Inconsistencia de datos.'], 200);
		} catch (\Throwable $th) {
			return response()->json(['mensaje' => 'No se pudo comunicarse en el servidor.' ], 500);
		}
	}

	public function obtenerUsuarios(){
		try {
			$aResultado = [];
			$oUsuarios = DB:: table('usuarios')
				->join('perfiles', 'perfiles.id', '=', 'usuarios.id_perfil')
				->join('estados', 'estados.id', '=', 'usuarios.id_estado')
				->select('usuarios.id', 'usuarios.nombre', 'usuarios.email', 'perfiles.id as id_perfil',  'perfiles.nombre as perfil', 'estados.id as id_estado' ,'estados.nombre as estado')
				->orderBy('usuarios.nombre', 'ASC')
				->get();

			foreach($oUsuarios as $usuario){
				$oIntereses = DB::table('rel_usuarios_intereses')
					->join('intereses', 'intereses.id', '=', 'rel_usuarios_intereses.id_interes')
					->join('usuarios', 'usuarios.id', '=', 'rel_usuarios_intereses.id_usuario')
					->select('intereses.id', 'intereses.nombre')
					->where('usuarios.id', $usuario->id)
					->orderBy('intereses.id', 'ASC')
					->get();
				$aResultado [] = ['id'=> $usuario->id, 'nombre'=> $usuario->nombre, 'email'=> $usuario->email, 'id_perfil'=> $usuario->id_perfil ,'perfil'=> $usuario->perfil, 'id_estado'=> $usuario->id_estado,'estado'=> $usuario->estado, 'intereses' => $oIntereses ];
			}
			return response()->json(['estado'=> true, 'resultado' => $aResultado], 200);

		} catch (\Throwable $th) {
			return response()->json(['mensaje' => 'No se pudo comunicarse en el servidor.' ], 500);
		}
	}
	public  function obtenerUsuario($id_usuario){
		try {
			if(Usuarios::where('id', $id_usuario)->exists()){
				$oUsuarios = Usuarios::find($id_usuario, ['id', 'id_perfil', 'nombre', 'email']);
				$oIntereses = DB::table('rel_usuarios_intereses')
					->join('intereses', 'intereses.id', '=', 'rel_usuarios_intereses.id_interes')
					->join('usuarios', 'usuarios.id', '=', 'rel_usuarios_intereses.id_usuario')
					->select('intereses.id')
					->where('usuarios.id', $id_usuario)
					->orderBy('intereses.id', 'ASC')
					->get();
				$resultado  = ['id'=> $oUsuarios->id, 'id_perfil'=> $oUsuarios->id_perfil, 'nombre'=> $oUsuarios->nombre, 'email'=> $oUsuarios->email, 'intereses'=> Arr::pluck($oIntereses, 'id')];	
                return response()->json([ 'estado'=> true, 'resultado'=> $resultado], 200);
			}
			return response()->json([ 'estado'=> false, 'mensaje'=> 'No exite este usuario.'], 200);
		} catch (\Throwable $th) {
			return response()->json(['mensaje' => 'No se pudo comunicarse en el servidor.' ], 500);
		}
	}
	public function guardarUsuario(Request $request){
		try {
			$id_perfil = (int)$request->id_perfil;
			$nombre    = $request->nombre;
			$email     = $request->email;
			$password  = $request->password;
			$intereses = $request->intereses;

			if($id_perfil && $nombre && $email && $password){

				if(Usuarios::where('email', $email)->exists()){
					return response()->json([ 'estado'=> false, 'mensaje'=> 'Email registrado intentelo con otro.'], 200);
				}
				
				$oUsuarios = new Usuarios;
				$oUsuarios->id_perfil = $id_perfil;
				$oUsuarios->id_estado = 1;
				$oUsuarios->nombre    = $nombre;
				$oUsuarios->email     = $email;
				$oUsuarios->password  = Hash::make($password);
				$oUsuarios->save();
				if(!empty($intereses)){
					foreach($intereses as $interes){
						$oRelUsuariosIntereses = new RelUsuariosIntereses;
						$oRelUsuariosIntereses->id_usuario = $oUsuarios->id;
						$oRelUsuariosIntereses->id_interes = $interes;
						$oRelUsuariosIntereses->save();
					}
				}
				return response()->json([ 'estado'=> true, 'mensaje'=> 'Datos guardado correctamente.'], 200 );
			}
			return response()->json([ 'estado'=> false, 'mensaje'=> 'Inconsistencia de datos.'], 200);
		} catch (\Throwable $th) {
			return response()->json(['mensaje' => 'No se pudo guardar los datos.' ], 500);
		}
	}
	public function modificarUsuario(Request $request, $id_usuario){
		try {
				$id_perfil = (int)$request->id_perfil;
				$nombre    = $request->nombre;
				$password  = $request->password;
				$intereses = $request->intereses;

				if($nombre){
					$oUsuarios = Usuarios::find($id_usuario);
					if($oUsuarios){
						$oUsuarios->nombre = $nombre;

						if($id_perfil){
							$oUsuarios->id_perfil = $id_perfil;
						}
						if($password){
							$oUsuarios->password  = Hash::make($password);
						}
						$oUsuarios->save();

						if(!empty($intereses)){
							$oRelUsuariosIntereses =  RelUsuariosIntereses::where('id_usuario', $id_usuario)->get();
							foreach($oRelUsuariosIntereses as $item){
								$item->delete();
							}
							foreach($intereses as $interes){
								$oRelUsuariosIntereses = new RelUsuariosIntereses;
								$oRelUsuariosIntereses->id_usuario = $id_usuario;
								$oRelUsuariosIntereses->id_interes = $interes;
								$oRelUsuariosIntereses->save();
							}
						}
						return response()->json([ 'estado'=> true, 'mensaje'=> 'Datos modificados correctamente.'], 200 );
					}
					return response()->json([ 'estado'=> false, 'mensaje'=> 'No exite este usuario.'], 200);
				}
				return response()->json([ 'estado'=> false, 'mensaje'=> 'Inconsistencia de datos.'], 200);
		} catch (\Throwable $th) {
			return response()->json(['mensaje' => 'No se pudo modificar los datos.' ], 500);
		}
	}
	public function eliminarUsuario($id_usuario){
		try {
			$oUsuarios = Usuarios::find($id_usuario);
			if($oUsuarios){
                $oRelUsuariosIntereses =  RelUsuariosIntereses::where('id_usuario', $id_usuario)->get();
				foreach($oRelUsuariosIntereses as $item){
					$item->delete();
				 }
				 $oUsuarios->delete();
				 return response()->json([ 'estado'=> true, 'mensaje'=> 'El usuario se elimino correctamente.'], 200 );
			}
			return response()->json([ 'estado'=> false, 'mensaje'=> 'No exite este usuario.'], 200);
		} catch (\Throwable $th) {
			return response()->json(['mensaje' => 'No se pudo eliminar el usuario.' ], 500);
		}
	}
	public function bloquearUsuario($id_usuario){
		try {
			if(Usuarios::where('id', $id_usuario)->exists()){
                $oUsuarios = Usuarios::find($id_usuario);
				$oUsuarios->id_estado = 2;
				$oUsuarios->save();

				return response()->json([ 'estado'=> true, 'mensaje'=> 'El usuario fue bloqueado correctamente.'], 200 );
			}
			return response()->json([ 'estado'=> false, 'mensaje'=> 'No exite este usuario.'], 200);
		} catch (\Throwable $th) {
			return response()->json(['mensaje' => 'No se pudo obtener los datos.' ], 500);
		}
	}
	public function ActivoUsuario($id_usuario){
		try {
			if(Usuarios::where('id', $id_usuario)->exists()){
                $oUsuarios = Usuarios::find($id_usuario);
				$oUsuarios->id_estado = 1;
				$oUsuarios->save();

				return response()->json([ 'estado'=> true, 'mensaje'=> 'El usuario fue activado correctamente.'], 200 );
			}
			return response()->json([ 'estado'=> false, 'mensaje'=> 'No exite este usuario.'], 200);
		} catch (\Throwable $th) {
			return response()->json(['mensaje' => 'No se pudo obtener los datos.' ], 500);
		}
	}
	public  function obtenerIntereses(){
		try {
			if(count( Intereses::all() ) > 0){
				return response()->json([ 'estado'=> true, 'resultado'=>  Intereses::all(['id as value', 'nombre as label']) ], 200);
			}
			return response()->json([ 'estado'=> false, 'mensaje' =>  'Sin datos registrados.' ], 200);
		} catch (\Throwable $th) {
			return response()->json(['mensaje' => 'No se pudo obtener los datos.' ], 500);
		}
	}
	public  function guardarInteresesUsuario(Request $request){
		try {
			$id_usuario   = $request->id;
			$intereses    = $request->intereses;
			if($id_usuario && $intereses){
				if(Usuarios::where('id', $id_usuario)->exists()){
					$oRelUsuariosIntereses =  RelUsuariosIntereses::where('id_usuario', $id_usuario)->get();
					foreach($oRelUsuariosIntereses as $item){
						$item->delete();
					}
					foreach($intereses as $interes){
						$oRelUsuariosIntereses = new RelUsuariosIntereses;
						$oRelUsuariosIntereses->id_usuario = $id_usuario;
						$oRelUsuariosIntereses->id_interes = $interes;
						$oRelUsuariosIntereses->save();
					}
                    return response()->json([ 'estado'=> true, 'mensaje'=> 'Se guardo sus intereses, se actualizara la lista de usuario en común en unos 30 segundos.'], 200 ); 
				}
				return response()->json([ 'estado'=> false, 'mensaje'=> 'No exite este usuario.'], 200);
			}
			return response()->json([ 'estado'=> false, 'mensaje' =>  'Inconsistencia de datos.' ], 200);
		} catch (\Throwable $th) {
			return response()->json(['mensaje' => 'No se pudo obtener los datos.' ], 500);
		}
	}
	public function obtenerInteresComunes(Request $request){
		try {
			$resultado = [];
			$id_usuario   = $request->id;
			$intereses    = $request->intereses;
			if($id_usuario && $intereses){
               $oUsuarios = DB::table('usuarios')->select('id','nombre')->whereNotIn('id', [$id_usuario])->get();				
			   foreach($oUsuarios as $usuario){
					$oIntereses = DB::table('rel_usuarios_intereses')
						->join('intereses', 'intereses.id', '=', 'rel_usuarios_intereses.id_interes')
						->join('usuarios', 'usuarios.id', '=', 'rel_usuarios_intereses.id_usuario')
						->select('intereses.nombre')
						->where('usuarios.id', $usuario->id)
						->whereIn('intereses.id', $intereses)
						->get();
					if(count($oIntereses) > 1){
						$aIntereses = [];
                       foreach($oIntereses as $interes){
                          $aIntereses[] = $interes->nombre;
					   }
					   $resultado[] = ['usuario'=> $usuario->nombre, 'intereses' => $aIntereses];
					}
			   }
			   return response()->json([ 'estado'=> true, 'resultado' =>  $resultado ], 200);
			}
			return response()->json([ 'estado'=> false, 'mensaje' =>  'Inconsistencia de datos.' ], 200);
		} catch (\Throwable $th) {
			return response()->json(['mensaje' => 'No se pudo obtener los datos.' ], 500);
		}

	}   
}
