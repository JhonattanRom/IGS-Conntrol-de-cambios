import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Cargo }  from "../Class/cargo";

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CargosService {
	private cargosUrl = 'http://localhost:8081/api/cargos';
  constructor(
    private http: HttpClient
        ){ }
  getCargos(): Observable<Cargo[]>{
  	return this.http.get<Cargo[]>(this.cargosUrl)
  }
  getCargo (id: number): Observable<Cargo> {
  	const url = `${this.cargosUrl}/${id}`;
  	return this.http.get<Cargo>(url);
  }
  addCargo (cargo: Cargo): Observable<Cargo> { 
  	return this.http.post<Cargo>(this.cargosUrl, cargo, httpOptions);
  }
  deleteCargo (cargo: Cargo | number): Observable<Cargo> {
  	const id = typeof cargo === 'number' ? cargo : cargo.Id_tipo_cargo;
  	const url = `${this.cargosUrl}/${id}`;

  	return this.http.delete<Cargo>(url, httpOptions);
  }
  updateCargo (cargo: Cargo): Observable<any> {
  	return this.http.put(this.cargosUrl, cargo, httpOptions);
  }
  alterHabCargo(DataCargo: any): Observable<any>{
      const url = `${this.cargosUrl}/alternar/${DataCargo.Id_tipo_cargo}`;
      return this.http.put(url, DataCargo, httpOptions);
  } 
}
