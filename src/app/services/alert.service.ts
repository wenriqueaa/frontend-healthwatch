import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private apiUrl: string = "http://localhost:3001/api"
  // private alertUser: string | null = sessionStorage.getItem('userId')
  constructor(private http: HttpClient) { }

  //creando funcion para buscar la informacion del encabezado http
  getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
  }

  //traer todas las alertas
  getAllAlerts(): Observable<any> {
    const headers = this.getHeaders()
    return this.http.get(`${this.apiUrl}/alerts`, { headers })
  }


  //organizando servicio para el api nueva alerta
  register(description: string, notificationEmail: boolean, notificationSms: boolean, frecuency: number, userAlert: string, typeAlert: string): Observable<any> {
    const headers = this.getHeaders()
    return this.http.post<any>(`${this.apiUrl}/newalert`, { description, notificationEmail, notificationSms, frecuency, userAlert, typeAlert }, { headers })
  }

  //traer todas las alertas para un usuario
  getAllAlertsUser(userAlert: any): Observable<any> {
    const headers = this.getHeaders()
    return this.http.get<any>(`${this.apiUrl}/alertsuser/${userAlert}`, { headers })
  }

  deleteAlertById(alertId: string): Observable<any> {
    const headers = this.getHeaders()
    return this.http.delete(`${this.apiUrl}/deletealert/${alertId}`, { headers })
  }

}
