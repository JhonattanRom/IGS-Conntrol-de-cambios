import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sucursal } from '../Class/sucursal';
import { Injectable } from '@angular/core';

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

	private sucursalessUrl = 'http://localhost:8081/api/sucursales';
    constructor(
    private http: HttpClient
    ){}

  getSucursal (id: number): Observable<Sucursal> {
      const url = `${this.sucursalessUrl}/${id}`;
      return this.http.get<Sucursal>(url);
  }
  getSucursales(): Observable<Sucursal[]>{
  	return this.http.get<Sucursal[]>(this.sucursalessUrl)
  }
  addSucursales (sucursal: any): Observable<any> { 
    return this.http.post<any>(this.sucursalessUrl, sucursal, httpOptions);
  }
  updateSucursal (sucursal: any): Observable<any> {
    return this.http.put(this.sucursalessUrl, sucursal, httpOptions);
  }
  alterHabSucursal(DataSucursal: any): Observable<any>{
      const url = `${this.sucursalessUrl}/alternar/${DataSucursal.Id_sucursal}`;
      return this.http.put(url, DataSucursal, httpOptions);
  } 
}
