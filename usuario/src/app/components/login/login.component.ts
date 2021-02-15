import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { ApiService } from '../../services/api.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	login = { email: '', password: ''};
	
	constructor(private router: Router, private api: ApiService) {
	 }

	ngOnInit(): void {
		if(localStorage.getItem('seccion')){
			this.router.navigate(['/home']);
		}
	}

	onSubmitForm(form: NgForm){
		if (form.invalid) {
			Object.values( form.controls ).forEach( control => {
			  control.markAsTouched();
			});
			return;
		  }
		  this.api.loginSeccion(form.value).subscribe( (resp:any) => {
			   if(resp.estado){
				 localStorage.setItem('seccion', JSON.stringify(resp.resultado));  
				 this.router.navigate(['/home']); 
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
