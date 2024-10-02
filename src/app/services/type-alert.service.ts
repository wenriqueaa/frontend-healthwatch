import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeAlertService {
  private apiUrl: string = "http://54.165.41.169:3001/api"

  constructor(private http: HttpClient) { }

  //creando funcion para buscar la informacion del encabezado http
  getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
  }

 //traer todas las alertas
 getAllTypeAlerts(): Observable<any> {
  const headers = this.getHeaders()
  return this.http.get(`${this.apiUrl}/typealerts`, { headers })
}

}
