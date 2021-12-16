import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ControlDeCambio } from "../Class/ControlDeCambio";

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ControlCambioService {
  private controlCambioUrl = 'http://localhost:8081/api/controlCambio';

  constructor(private http: HttpClient) { }
	 getControlesDeCambio(): Observable<ControlDeCambio[]> {
	  	return this.http.get<ControlDeCambio[]>(this.controlCambioUrl);
	  }
	  getPrsenteYearCount(): Observable<any> {
	  	const url = 'http://localhost:8081/api/PresentYearcontrolCambio/presente';
	  	return this.http.get<any>(url);
	  }
	  getLastYearCount(LastYear: any): Observable<any>{
	  	const url = 'http://localhost:8081/api/LastYearcontrolCambio/pasado';
	  	return this.http.post<any>(url, LastYear, httpOptions);
	  }
	  getServiceSolicitados(): Observable<any> {
	  	const url = "http://localhost:8081/api/ListadoCCservicios"
	  	return this.http.get<any>(url);
	  }
	  getprioridadesSolicitadas(): Observable<any> {
	  	const url = "http://localhost:8081/api/ListadoCCPrioridades"
	  	return this.http.get<any>(url);
	  }
	  getContadoresCC(): Observable<any>{
	  	const url = "http://localhost:8081/api/Contadores";
	  	return this.http.get<any>(url);
	  }
	  addControlDeCambio (controlDeCambio: ControlDeCambio): Observable<ControlDeCambio> { 
	  	return this.http.post<ControlDeCambio>(this.controlCambioUrl, controlDeCambio, httpOptions);
	  }
	  getControlCambio (id: number): Observable<ControlDeCambio> {
	  	const url = `${this.controlCambioUrl}/${id}`;
	  	return this.http.get<ControlDeCambio>(url);
	  }
	  updateControlCambio (controlDeCambio: ControlDeCambio): Observable<any> {
	  	return this.http.put(this.controlCambioUrl, controlDeCambio, httpOptions);
	  }
	  planificarControlCambio(id: number, controlDeCambio: any): Observable<any>{
	  	const url = `${this.controlCambioUrl}/planificar/${id}`;
	  	return this.http.put(url, controlDeCambio, httpOptions);
	  }
	  evaluarControlCambio(controlDeCambio: any): Observable<any>{
	  	const url = `${this.controlCambioUrl}/Evaluar`;
	  	return this.http.put(url, controlDeCambio, httpOptions);
	  }
	  FinalizarControlCambio(controlDeCambio: any): Observable<any>{
	  	const url = `${this.controlCambioUrl}/Finalizar`;
	  	return this.http.put(url, controlDeCambio, httpOptions);
	  }
	  EjecutarControlCambio(controlDeCambio : any): Observable<any>{
	  	const url = `${this.controlCambioUrl}/Ejecutar`;
	  	return this.http.put(url, controlDeCambio, httpOptions);
	  }
	  UpdatePlanificacion(controlDeCambio: ControlDeCambio ): Observable<any>{
	  	const url = `http://localhost:8081/api/UpdatePlanificacion`;
	  	return this.http.put(url,controlDeCambio, httpOptions);
	  }
}
