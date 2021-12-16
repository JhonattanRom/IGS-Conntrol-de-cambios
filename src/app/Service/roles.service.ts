import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../Class/rol';

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private rolesUrl = 'http://localhost:8081/api/roles';
  constructor(private http: HttpClient) { }

  getRoles(): Observable<Rol[]>{
  	return this.http.get<Rol[]>(this.rolesUrl)
  }

}
