import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs';
import { Router } from '@angular/router';
//import  "rxjs/add/observable/fromPromise";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import * as jwt_decode from 'jwt-decode';
//var observableFromPromise = Observable.fromPromise(promiseSrc);
const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private SigninsUrl = 'http://localhost:8081/api/signin';
  private SigninsUrl2 = 'http://localhost:8081/api/signup';
  token = "";
  constructor(private http: HttpClient,private router: Router){}

  Login (user): Observable<any> {
  	return this.http.post<any>(this.SigninsUrl, user)
  }
  Registrar(user): Observable<any>{
    return this.http.post<any>(this.SigninsUrl2, user)
  }
  LoggedIn():boolean {
  	return !!localStorage.getItem("token");
  }

  promesita() {

    return localStorage.getItem("token");

  }

  decodeToken(){
    var token = localStorage.getItem("token");
    var decoded = jwt_decode(token); 
    //console.log(decoded, "El decode");
    //console.log(decoded.Cedula_Usuario, "Este es el id");
    return decoded;
  }


  _rPromise() {
  // Variable que deseo retornar
  // por fuera de la función
  //let $r = null; 
  let _promise = new Promise(
    function(resolve, reject) {
     localStorage.getItem("token");
    }
  );

  // No hace falta
  /*_promise.then(
    function(result) {
      return $r;
    }
  );*/
  
  return _promise; // Devolver la promesa
}

getToken(){
  return localStorage.getItem("token");
}
 

 /*
  getToken(): Observable<any>{
  	//this.token = 
  	return Observable.fromPromise(this._rPromise());
     
  }*/
  logOut(){
    return localStorage.removeItem("token");
    this.router.navigate(['/']);
  }

}

 

/*eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZF9Vc3VhcmlvIjoxLCJDZWR1bGFfVXN1YXJpbyI6IjIyLjk5OC42ODYiLCJOb21icmVfVXN1YXJpbyI6Ikpob25hdHRhbiIsIklkX0NhcmdvX1VzdWFyaW8iOjEsIklkX1JvbF9Vc3VhcmlvIjoxLCJDb3JyZW9fVXN1YXJpbyI6IktvbGxvbjAxQGdtYWlsLmNvbSIsIlBhc3N3b3JkX1VzdWFyaW8iOiJNaUNvbnRyYXNlw7FhIiwiRXN0YWRvX1VzdWFyaW8iOnRydWUsImlhdCI6MTU3NzczNjY0N30.rqieC7gq4SVEWEpzEVsMY0GzO_ngK1v8r1qYVZEUXNs*/