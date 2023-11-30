import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs';
import { Departamento } from '../interfaces/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private endpoint: string = environment.baseUrl
  private apiurl: string = this.endpoint + 'Apartment'

  constructor(private http: HttpClient) { }

  getList(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.apiurl}`+'?pageSize=10&pageNumber=1');
  }

  add(departamento:Departamento): Observable<Departamento>{
    return this.http.post<Departamento>(`${this.apiurl}`+'/create',departamento);
  }
}
