import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  alerts: any[] = []
  userAlert: any



  constructor( private router: Router, private alertService: AlertService){}

  ngOnInit(): void {
    this.loadAlerts()
  }

  loadAlerts(): void {
    this.userAlert =  sessionStorage.getItem('userId')
    console.log(this.userAlert)
    this.alertService.getAllAlertsUser(this.userAlert).subscribe(
      response => {
//        console.log(response)
        this.alerts = response.alerts
        console.log(this.alerts)
      },
      error => {
        console.log(error)
      }
    )
  }

  viewAlert(alertId: String): void {
    //a la ventana que quiero ir y con que valores
    this.router.navigate(['/alert', alertId])
  }
  

  //llamar al boton de nueva alerta
  getNewAlert() : void {
    console.log(this.router)
    this.router.navigate(['/new-alert'])
  }

//eliminar una alerta
deleteAlertById(alertId: string) : void {
  Swal.fire({
    title: 'Desea borrar esta alerta',
    showCancelButton: true,
    confirmButtonText: 'Yes'
  }).then((result) => {
    if(result.isConfirmed) {
      this.alertService.deleteAlertById(alertId).subscribe(
        response => {
            console.log(response)
            Swal.fire('deleted', response.msg , 'success' )
            this.alerts = this.alerts.filter( x => x._id !== alertId)
        },
        error => {
            console.log(error)
        }
      )
    
    }
  });
 }


}


 