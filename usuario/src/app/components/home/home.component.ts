import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  seccion:any = {};
  constructor(private router: Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem('seccion')){
			this.router.navigate(['/login']);
		}
    this.seccion = JSON.parse(localStorage.getItem('seccion'));
  }

}
