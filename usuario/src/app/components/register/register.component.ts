import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { ApiService } from '../../services/api.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	usuario= {id_perfil: 1, nombre: '', email:'', password:'', confirmar_password: ''};

	constructor(private router: Router, private api: ApiService) {
	 }

	ngOnInit(): void {
	}
	onSubmitForm(form: NgForm){
		if (form.invalid) {
			Object.values( form.controls ).forEach( control => {
			  control.markAsTouched();
			});
			return;
		  }
		  this.usuario.nombre = form.value.nombre;
		  this.usuario.email  = form.value.email;
		  if(form.value.password === form.value.confirmar_password){
			  this.usuario.password = form.value.password;
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
						this.router.navigate(['/login']); 
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
