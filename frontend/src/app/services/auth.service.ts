import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api';

  constructor( 
    private http: HttpClient,
    private router: Router  
  ) { }

  signUp(user){
    return this.http.post<any>(this.URL + '/signup', user);
  }

  signIn(user){
    return this.http.post<any>(this.URL + '/signIn', user);
  }

  //mètodo que verifica si el token existe en el localStorage, devuelve booleano
  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/signin'])
  }

}
