import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service';
import { Employee } from '../interface/employee'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private cookieService: CookieService) { }
	
  login: Employee | undefined;
	
  ngOnInit() {
	
  }

  getLogin(username: string, password: string): void {
	this.login = {'username': username, 'password': password, 'jobTitle': ""};
	console.log(this.login);
    this.loginService.getLogin(this.login).subscribe(token => {
		// this.login = employee
		// console.log(this.login)
		// console.log(token);
		// if (this.login == null) {
		// 	console.log("Failed Login")
		// } else {
		// 	this.router.navigate(['dashboard']);
		// }

		// console.log(`Saving token: ${token}`);
		this.cookieService.set('auth', token);
		// console.log(`Getting token: ${this.cookieService.get('auth')}`);
		this.router.navigate(['/dashboard']);
	});
  }
}
