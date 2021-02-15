import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

	usuarios: any[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
	this.api.obtenerUsuarios().subscribe( (resp: any) => {
		if(resp.estado){
			this.usuarios = resp.resultado;
		}else{
			Swal.fire({
				icon: 'error',
				title: resp.mensaje,
				allowOutsideClick: false,
				timer: 1500,
				showCloseButton: true
			  });
		}
	  });  
  }
  clickEliminar(usuario:any, index:number){
			Swal.fire({
				title: `Estas seguro de eliminar al usuario ${usuario.nombre} ?`,
				icon: 'warning',
				allowOutsideClick: false,
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Aceptar'
			}).then((result) => {
				if (result.isConfirmed) {
					this.api.eliminarUsuario(usuario).subscribe((resp:any) => {
						if(resp.estado){
							this.usuarios.splice(index, 1);
							Swal.fire({
								title: `${resp.mensaje}`,
								allowOutsideClick: false,
								icon: 'success',
							})
						}
					});
				}
			});
	}
	clickBloquear(usuario:any){
		Swal.fire({
			title: `Estas seguro de bloquear al usuario ${usuario.nombre} ?`,
			icon: 'warning',
			allowOutsideClick: false,
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Aceptar'
		}).then((result) => {
			if (result.isConfirmed) {
				this.api.bloquearUsuario(usuario).subscribe((resp:any) => {
					if(resp.estado){
						usuario.id_estado = 2;
						usuario.estado    ='Bloqueado';
						Swal.fire({
							title: `${resp.mensaje}`,
							allowOutsideClick: false,
							icon: 'success',
						})
					}
				});
			}
		});
   }
   clickActivar(usuario:any){
	Swal.fire({
		title: `Estas seguro de activar al usuario ${usuario.nombre} ?`,
		icon: 'warning',
		allowOutsideClick: false,
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Aceptar'
	}).then((result) => {
		if (result.isConfirmed) {
			this.api.ActivoUsuario(usuario).subscribe((resp:any) => {
				if(resp.estado){
					usuario.id_estado = 1;
					usuario.estado    ='Activo';
					Swal.fire({
						title: `${resp.mensaje}`,
						allowOutsideClick: false,
						icon: 'success',
					})
				}
			});
		}
	});
	
  }
}
