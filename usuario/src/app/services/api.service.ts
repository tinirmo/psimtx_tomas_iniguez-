import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private http: HttpClient) {
	 }
	 loginSeccion(login:any){
		return this.http.post(`${environment.apiUrl}/api/login`,login);
	 }
	 obtenerUsuarios(){
		return this.http.get(`${environment.apiUrl}/api/obtenerusuarios`);
	 }
	 obtenerUsuario(id_usuario){
		return this.http.get(`${environment.apiUrl}/api/obtenerusuario/${id_usuario}`);
	 }
	 guardarUsuario(usuario:any){
		return this.http.post(`${environment.apiUrl}/api/guardarusuario`,usuario);
	 }
	 modificarUsuario(usuario:any){
		 return this.http.put(`${environment.apiUrl}/api/modificarusuario/${usuario.id}`, usuario);
	 }
	 eliminarUsuario(usuario:any){
		return this.http.delete(`${environment.apiUrl}/api/eliminarusuario/${usuario.id}`);
	 }
	 bloquearUsuario(usuario:any){
		return this.http.get(`${environment.apiUrl}/api/bloquearusuario/${usuario.id}`);
	 }
	 ActivoUsuario(usuario:any){
		return this.http.get(`${environment.apiUrl}/api/Activoasuario/${usuario.id}`);
	 }
	 obtenerIntereses(){
		return this.http.get(`${environment.apiUrl}/api/obtenerintereses`);
	 }
	 guardarInteresesUsuario(usuario:any){
		 return this.http.post(`${environment.apiUrl}/api/guardarinteresesusuario`, usuario);
	 }
	 obtenerInteresComunes(usuario:any){
		return this.http.post(`${environment.apiUrl}/api/obtenerinterescomunes`, usuario); 
	 }
}
