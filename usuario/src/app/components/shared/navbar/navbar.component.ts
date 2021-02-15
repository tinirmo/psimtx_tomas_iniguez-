import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() seccion:any = {};

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  cerrarSeccion(){
	localStorage.clear();
	this.router.navigate(['/login']);
  }
}
