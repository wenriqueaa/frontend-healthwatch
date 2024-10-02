// autorizacion del servicio
import { Injectable } from '@angular/core';
// conectar back con el front
import { HttpClient, HttpHeaders } from '@angular/common/http';
//permite ayudar a la conexion httpclient
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //ruta del backend para ejecutar los api rest
  private apiUrl = "http://54.165.41.169:3001/api"
  private roleAdministration: boolean = false
  private userNameSubject = new BehaviorSubject<string | null>(null)

  userName$ = this.userNameSubject.asObservable() 

  constructor(private http: HttpClient) { }

  //creando funcion para buscar la informacion del encabezado http
  getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
  }

  //servicio para login
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
  }

  //servicio para login, pregunta si existe el email
  user(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user?email=${email}`)
  }


  //Revisa si el usuario se encuentra logeado
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token')
  }

  //Realizar logout
  logout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('userName')
    sessionStorage.removeItem('userRole')
  }

  //organizando servicio para el api registro usuario que tienen un post y un json
  register(email: string, password: string, userName: string, userRole: boolean): Observable<any> {
    console.log('enviando el nombre')
    console.log(userName)
    return this.http.post<any>(`${this.apiUrl}/register`, { email, password, userName, userRole })
  }

  //Trae el token
  getToken(): string | null {
    return sessionStorage.getItem('token')
  }

  //Trae el id del usuario
  getUserId(): string | null {
    return sessionStorage.getItem('userId')
  }

  //Trae el nombre del usuario
  getUserName(): string | null {
    return sessionStorage.getItem('userName')
  }

  //Revisa si el usuario es administrador
  isUserAdministrator(): boolean {
    this.roleAdministration = false
    console.log(sessionStorage.getItem('userRole'))
    if (sessionStorage.getItem('userRole') == 'true') {
      this.roleAdministration = true
    }
    return this.roleAdministration

  }

  //traer los datos para un usuario
  getUser(userId: any): Observable<any> {
    const headers = this.getHeaders()
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`, { headers })
  }

  //servicio para coleccion bancosangre
  bancoSangre(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bancosangre`)
  }


  //servicio para coleccion nameService
  dataService(nameService: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${nameService}`)
  }
  synchronizationData(service: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/synchronization?service=${service}`, '')
  }

setUserName(userName: string){
  this.userNameSubject.next(userName)
}


}

