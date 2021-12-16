import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio } from '../Class/servicio';

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ServiciosService {
  private serviciosUrl = 'http://localhost:8081/api/servicios';
  constructor(
    private http: HttpClient
    ){ }

  getServicios (): Observable<Servicio[]> {
  	return this.http.get<Servicio[]>(this.serviciosUrl)
  }

  getServicio (id: number): Observable<Servicio> {
  	const url = `${this.serviciosUrl}/${id}`;
  	return this.http.get<Servicio>(url);
  }

  addServicio (servicio: Servicio): Observable<Servicio> { 
  	return this.http.post<Servicio>(this.serviciosUrl, servicio, httpOptions);
  }

  deleteServicio (servicio: Servicio | number): Observable<Servicio> {
  	const id = typeof servicio === 'number' ? servicio : servicio.Id_servicio_app;
  	const url = `${this.serviciosUrl}/${id}`;

  	return this.http.delete<Servicio>(url, httpOptions);
  }

  updateServicio (servicio: Servicio): Observable<any> {
  	return this.http.put(this.serviciosUrl, servicio, httpOptions);
  }
  alterHabServicio(DataServicio: any): Observable<any>{
      const url = `${this.serviciosUrl}/alternar/${DataServicio.Id_servicio_app}`;
      return this.http.put(url, DataServicio, httpOptions);
  } 
}

