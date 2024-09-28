import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { TypeAlertService } from '../../services/type-alert.service';

import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-alert',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-alert.component.html',
  styleUrl: './new-alert.component.css'
})
export class NewAlertComponent {

  typeAlerts: any[] = []
  // no esta inicializado, pero luego aseguro valor
  selectionTypeAlert!: string

  description: string = ''
  notificationEmail: boolean = false
  notificationSms: boolean = false
  frecuency: number = 1
  userAlert: string = ''
  typeAlert: string = ''


  constructor(private router: Router,
    private alertService: AlertService,
    private typeAlertService: TypeAlertService
) { }

  ngOnInit(): void {
    //this.typeAlerts
    console.log('lista tipo de alertas desde ngOnInit')
    console.log(this.loadtypeAlerts())
    this.loadtypeAlerts()
  }

  loadtypeAlerts(): void {
    this.typeAlertService.getAllTypeAlerts().subscribe(
      response => {
        console.log('lista de tipo de alertas desde loadtypeAlerts')
        console.log(response)
        this.typeAlerts = response.typeAlerts
        console.log('lista de tipo de alertas asignada a typeAlerts desde loadtypeAlerts')
        console.log(this.typeAlerts)
      },
      error => {
        console.log(error)
      }
    )

  }



  newAlert(): void {
    console.log(this.description)
    console.log(this.notificationEmail)
    console.log(this.notificationSms)
    console.log(this.frecuency)
    console.log(this.selectionTypeAlert)
    const userId: string | null = sessionStorage.getItem('userId')
    console.log(userId)
    if (userId === null) {
      Swal.fire('Alerta no se puede registrar..', 'no tiene userid', 'error')
    } else {
      this.userAlert = userId
      //activar el servicio register
      this.alertService.register(this.description, this.notificationEmail, this.notificationSms, this.frecuency, this.userAlert, this.selectionTypeAlert).subscribe(
        response => {
          console.log('ejecutado desde respuesta')
          console.log(response)
          if (response.ok) {
            Swal.fire('Alerta registrada!..', response.msg, 'success')
            //redirecciona a la alerta
            this.router.navigate(['/alert'])
          } else {
            Swal.fire('error!, desde registro de alerta.', response.error.msg, 'error')
          }
        },
        error => {
          console.log('Ejecutado desde el error')
          console.log(error)
          Swal.fire('!!upss error, registro alerta', error.error.msg, 'error')
        }
      )

    }
  }

  cancelar(): void {
    //redirecciona a las incidencias
    this.router.navigate(['/alert'])
  }

}
