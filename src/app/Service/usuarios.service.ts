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
export class UsuariosService {

 private usuariosUrl = 'http://localhost:8081/api/usuarios';
  constructor(private http: HttpClient){}

  getUsuarios(): Observable<Usuario[]> {
  	return this.http.get<Usuario[]>(this.usuariosUrl);
  }
  getUsuario (id: number): Observable<Usuario> {
  	const url = `${this.usuariosUrl}/${id}`;
  	return this.http.get<Usuario>(url);
  }
  getUsuariobyState (estado : boolean): Observable<Usuario[]> {
      const url = `${this.usuariosUrl}/estado/${estado}`;
      return this.http.get<Usuario[]>(url);
  }
  updateUsuario (usuario: any): Observable<any> {
    return this.http.put(this.usuariosUrl, usuario, httpOptions);
  }
  alterHabUsuario(DataUser: any): Observable<any>{
      const url = `${this.usuariosUrl}/alternar/${DataUser.Id_Usuario}`;
      return this.http.put(url, DataUser, httpOptions);
  }
  DatosPerfil(Id_Usuario): Observable<any>{
    const url = `${this.usuariosUrl}/perfil`;
    return this.http.post<any>(url, Id_Usuario, httpOptions);
  }
}
