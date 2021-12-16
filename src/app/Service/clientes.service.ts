import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../Class/usuario';

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private clientesUrl = 'http://localhost:8081/api/clientes';
  constructor(private http: HttpClient) { }
   getClientesbyState (estado : boolean): Observable<any[]> {
      const url = `${this.clientesUrl}/estado/${estado}`;
      return this.http.get<any[]>(url);
    }
    alterHabCliente(DataCliente: any): Observable<any>{
      const url = `${this.clientesUrl}/alternar/${DataCliente.Id_Empresa}`;
      return this.http.put(url, DataCliente, httpOptions);
  } 
}
