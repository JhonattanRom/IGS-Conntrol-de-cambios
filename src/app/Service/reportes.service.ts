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
export class ReportesService {
  private reportesUrl = 'http://localhost:8081/api/reporte';
  constructor(private http: HttpClient) { }
  
  getdataReportPersonal(data){
    return this.http.post<any>(this.reportesUrl, data, httpOptions);
  }
 
}
