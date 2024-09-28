import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private apiUrl: string = "http://localhost:3001/api"

  constructor(private http: HttpClient) { }

  //creando funcion para buscar la informacion del encabezado http
  getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
  }

  //traer todas las incidencias
  getAllIncidents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/incidents`)
  }

  //trae la informacion de una incidencia
  getIncidentById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/incident/${id}`)
  }


  //elimina una incidencia
  deleteIncidentById(Id: string): Observable<any> {
    const headers = this.getHeaders()
    return this.http.delete(`${this.apiUrl}/deleteincident/${Id}`, { headers })
  }

  //actualiza una incidencia
  updateIncidentById(Id: string | null, data: any): Observable<any> {
    const headers = this.getHeaders()
    return this.http.put(`${this.apiUrl}/updateincident/${Id}`, data, { headers })
  }

  //nueva incidencia
  register(data: any ): Observable<any> {
    const headers = this.getHeaders()
    return this.http.post<any>(`${this.apiUrl}/newincident`, data, { headers })
  }

}
