import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

import Swal from 'sweetalert2';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  seccion:any = {};
  id_usuario:any;
  usuario: any= {id_perfil: '', nombre: '', email:'', password:'', confirmar_password: '', intereses:''};
  intereses:any = [{}];


  constructor(private router: Router, private router_active: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
	if(!localStorage.getItem('seccion')){
			this.router.navigate(['/login']);
		}
	this.seccion = JSON.parse(localStorage.getItem('seccion'));

	this.id_usuario = this.router_active.snapshot.paramMap.get('id_usuario');
	if (this.id_usuario !== 'nuevo') {
        this.api.obtenerUsuario(this.id_usuario).subscribe((resp:any) => {
			if(resp.estado){
               this.usuario = resp.resultado;
			   console.log(this.usuario);
			}else{
				Swal.fire({
					icon: 'error',
					title: resp.mensaje,
					allowOutsideClick: false,
					showCloseButton: true
				  }).then((result) => {
					if (result.isConfirmed) {
						this.router.navigate(['/home']); 
					} 
				  });
			}
		});
	}
	this.api.obtenerIntereses().subscribe((resp:any) => {
		if(resp.estado){
            this.intereses = resp.resultado;
		}
	});
  }
  onSubmitForm(form: NgForm){
    if (form.invalid) {
			Object.values( form.controls ).forEach( control => {
			  control.markAsTouched();
			});
			return;
		  }
		  if(form.value.intereses.length >5){
			Swal.fire({
				icon: 'error',
				title: 'Maxímo 5 intereses que pueda seleccionar',
				allowOutsideClick: false,
				timer: 1500,
				showCloseButton: true
			  });
			  return;
		  }
		  if(this.usuario.id){
			if(form.value.password){
				if(form.value.password !== form.value.confirmar_password){
					Swal.fire({
						icon: 'error',
						title: 'Debe ser iguales las passwords',
						allowOutsideClick: false,
						timer: 1500,
						showCloseButton: true
					  });
					  return
				}
			}  
			this.usuario = form.value;
			this.usuario.id = this.id_usuario;
			this.api.modificarUsuario(this.usuario).subscribe((resp:any) => {
				let mensaje = resp.mensaje;
				if(resp.estado){
				  Swal.fire({
					  icon: 'success',
					  title: mensaje,
					  allowOutsideClick: false,
					  showCloseButton: true
					}).then((result) => {
					  if (result.isConfirmed) {
						  this.router.navigate(['/home']); 
					  } 
					});
				}
				else{
				  Swal.fire({
					  icon: 'error',
					  title: mensaje,
					  allowOutsideClick: false,
					  timer: 1500,
					  showCloseButton: true
					});
				}
			});
		  }else{
			if(form.value.password === form.value.confirmar_password){
				this.usuario = form.value;
			}
			else{
			  Swal.fire({
				  icon: 'error',
				  title: 'Debe ser iguales las passwords',
				  allowOutsideClick: false,
				  timer: 1500,
				  showCloseButton: true
				});
				return;
			}
		this.api.guardarUsuario(this.usuario).subscribe((resp:any) =>{
				let mensaje = resp.mensaje;
				if(resp.estado){
				  Swal.fire({
					  icon: 'success',
					  title: mensaje,
					  allowOutsideClick: false,
					  showCloseButton: true
					}).then((result) => {
					  if (result.isConfirmed) {
						  this.router.navigate(['/home']); 
					  } 
					});
				}
				else{
				  Swal.fire({
					  icon: 'error',
					  title: mensaje,
					  allowOutsideClick: false,
					  timer: 1500,
					  showCloseButton: true
					});
				}
			});
		  }
  }
}
