import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';


import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  name: string = ''
  email: string = ''
  password: string = ''
  userName: string = ''
  userRole: boolean = false
  loginCaption: string = 'Ingresar/Registrar'
  loginHeading: string = 'Login'
  existsEmail: boolean = false
  constructor(private router: Router, private authService: AuthService) { }

  login(): void {
    //Si existe Email realiza login, de lo contrario registra usuario
    if (this.existsEmail) {
      console.log(this.email)
      console.log(this.password)
      this.authService.login(this.email, this.password).subscribe(
        //subscribe recibe dos parametros, responsive, error
        response => {
          console.log('entrando ok')
          if (response.ok) {
            //guardar session
            sessionStorage.setItem('token', response.token)
            //guarda datos del usuario de la sesion
            sessionStorage.setItem('userId', response.userId)
            sessionStorage.setItem('userEmail', this.email)
            sessionStorage.setItem('userName', response.userName)
            sessionStorage.setItem('userRole', response.userRole)
            console.log(response.userName)
            console.log(response.userRole)

            this.authService.setUserName(response.userName)
            Swal.fire('Bienvenido Usuario logeado', response.msg, 'success')


            this.router.navigate(['/'])
          } else {
            Swal.fire('Errores de ingreso', response.error.msg, 'success')
          }
        }, error => {
          Swal.fire('Upps errores', error.error.msg, 'error')
        }
      )
    } else {
      console.log('ingreso data del formulario');
      console.log(this.email)
      console.log(`email ${this.userName}`);
      if (this.userName == ''|| this.email == '' || this.password == '') {
        Swal.fire('recordar el nombre', 'requiere colocar el correo,la clave y el nombre para registrarse', 'error')
      } else {      
      //activar el servicio register
      this.authService.register(this.email, this.password, this.userName, this.userRole).subscribe(
        response => {
          console.log('ejecutado desde respuesta')
          console.log(response)
          if (response.ok) {
            Swal.fire('Usuario registrado!..', response.msg, 'success')
            //redirecciona al login
            this.email = ''
            this.password = ''
            this.userName = ''
            this.userRole = false
            this.router.navigate(['/login'])
          } else {
            Swal.fire('Errores de registro de usuario', response.error.msg, 'error')
          }
        },
        error => {
          console.log('Ejecutado desde el error')
          console.log(error)
          Swal.fire('!!upss error', error.error.msg, 'error')
        }
      )
    }
    }
  }


  checkIfExistsUser(): void {
    console.log(this.email)
    this.existsEmail = false
    this.authService.user(this.email).subscribe(
      //subscribe recibe dos parametros, responsive, error
      response => {
        console.log('entrando ok', response)
        if (response.ok) {
          //guardar session
          this.loginCaption = 'Ingresar'
          this.loginHeading = 'Login'
          this.existsEmail = true
          // Swal.fire('User found', response.msg, 'success')
        } else {
          Swal.fire('Upps errores', response.response.msg, 'error')

        }
      }, error => {
        this.loginCaption = 'Registrarse'
        this.loginHeading = 'Register'

        //  Swal.fire('Upps errores', error.error.msg, 'error')
      }
    )
  }


  IsExistEmail(): boolean {
    return this.existsEmail
  }
}


