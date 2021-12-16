import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Comentario }  from "../Class/comentario";

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

private ComentariosUrl = 'http://localhost:8081/api/comentarios';

  constructor(private http: HttpClient) { }

  getComentarios(id : number): Observable<any>{

    const url = `${this.ComentariosUrl}/Tarea/${id}`;
  	return this.http.get<any>(url)
  }
  addComentarios(data): Observable<any> {
	return this.http.post<any>(this.ComentariosUrl, data, httpOptions);
  }
}
