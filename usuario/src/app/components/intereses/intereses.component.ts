import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { ApiService } from '../../services/api.service';

@Component({
	selector: 'app-intereses',
	templateUrl: './intereses.component.html',
	styleUrls: ['./intereses.component.css']
})
export class InteresesComponent implements OnInit {

	id_usuario:any;
	usuario: any= {intereses:''};
	intereses:any = [{}];
	interesesComunes:any = [];
	constructor(private router: Router, private api: ApiService) { }

	ngOnInit(): void {
			 this.id_usuario  = JSON.parse(localStorage.getItem('seccion')).id;
			 this.api.obtenerUsuario(this.id_usuario).subscribe((resp:any) => {
				if(resp.estado){
				   this.usuario = resp.resultado;
				   this.interesesComunAsync();
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
			 this.api.obtenerIntereses().subscribe((resp:any) => {
				if(resp.estado){
					this.intereses = resp.resultado;
				}
			 });
	}
	onSubmitForm(form: NgForm){
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
		  this.usuario = form.value;
		  this.usuario.id = this.id_usuario;
		  this.api.guardarInteresesUsuario(this.usuario).subscribe((resp:any) => {
			  let mensaje = resp.mensaje;
               if(resp.estado){
				Swal.fire({
					icon: 'success',
					title: mensaje,
					allowOutsideClick: false,
					showCloseButton: true
				  }).then((result) => {
					if (result.isConfirmed) {
						const promise = new Promise((resolve,reject) => {
							setInterval( () => {
							  this.interesesComunAsync();
							  resolve('Datos sincronizados!!');
							}, 30000);
						});
						promise.then((resp:any) => {console.log(resp)});
					} 
				  });

			   }else{
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
	interesesComunAsync(){
		this.api.obtenerInteresComunes(this.usuario).subscribe((resp:any) => {
			if(resp.estado){
				this.interesesComunes = resp.resultado;
				console.log(this.interesesComunes);
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
}
