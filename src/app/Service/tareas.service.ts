import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../Class/tareas';


const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private TareassUrl = 'http://localhost:8081/api/tareas';
  constructor(private http: HttpClient) { }

  getTareas(id : number): Observable<any>{
    const url = `${this.TareassUrl}/ControlCambio/${id}`;
  	return this.http.get<any>(url)
  }
  getTareasPersonal(idPersonal, idCC): Observable<any>{
    const url = `${this.TareassUrl}/ControlCambio/${idPersonal}/${idCC}`;
    return this.http.get<any>(url)
  }
  getTarea (id: number): Observable<Tarea> {
  	const url = `${this.TareassUrl}/${id}`;
  	return this.http.get<Tarea>(url);
  }
  updateTarea (tarea: any): Observable<any> {
    return this.http.put(this.TareassUrl, tarea, httpOptions);
  }
  registrarTarea(tarea: any): Observable<any>{
    return this.http.post<any>(this.TareassUrl, tarea, httpOptions);
  }
  CompletarTaraea(Data: any): Observable<any>{
      const url = `${this.TareassUrl}/completar/${Data.ID_Tarea}`;
      return this.http.put(url, Data, httpOptions);
  }
  
}
