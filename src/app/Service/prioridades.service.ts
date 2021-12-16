import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Prioridad }  from "../Class/prioridad";


const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PrioridadesService {

private prioridadesUrl = 'http://localhost:8081/api/prioridades';
  
  constructor(private http: HttpClient){}

	getPrioridades(): Observable<Prioridad[]>{
	  	return this.http.get<Prioridad[]>(this.prioridadesUrl)
	  }
}
