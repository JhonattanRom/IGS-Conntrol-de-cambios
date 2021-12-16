import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../Class/empresa';


const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
 
 private empresassUrl = 'http://localhost:8081/api/empresas';
  constructor(
    private http: HttpClient
    ){}
  getEmpresa (id: number): Observable<Empresa> {
      const url = `${this.empresassUrl}/${id}`;
      return this.http.get<Empresa>(url);
  }
  addEmpresa (empresa): Observable<Empresa> { 
  	return this.http.post<Empresa>(this.empresassUrl, empresa, httpOptions);
  }
  getEmpresas(): Observable<Empresa[]>{
  	return this.http.get<Empresa[]>(this.empresassUrl)
  }
  updateEmpresa (empresa: Empresa): Observable<any> {
    return this.http.put(this.empresassUrl, empresa, httpOptions);
  }
}
