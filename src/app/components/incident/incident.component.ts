import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IncidentService } from '../../services/incident.service';

import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-incident',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './incident.component.html',
  styleUrl: './incident.component.css'
})
export class IncidentComponent implements OnInit {

  incidents: any[] = []
  currentIndex = 0;

  constructor(private router: Router,
    private incidentService: IncidentService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loadIncidents()
  }

  loadIncidents(): void {

    this.incidentService.getAllIncidents().subscribe(

      response => {
        console.log(response.incidents)
        this.incidents = response.incidents
        console.log(this.incidents)
      },
      error => {
        console.log(error)
      }
    )
  }


  viewFile(incidentId: String): void {
    //a la ventana que quiero ir y con que valores
    this.router.navigate(['/incident', incidentId])
  }

  
  updateCardCarousel() {
    const carousel = document.querySelector('.carousel') as HTMLElement;
    carousel.style.transform = `translateX(-${this.currentIndex * 100}%)`;
  }

  nextCard() {
    if (this.currentIndex < this.incidents.length - 1) {
      this.currentIndex++;
    } else {
      //  Volver al inicio, primera card
      this.currentIndex = 0; 
    }
    this.updateCardCarousel();
  }

  previousCard() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      // Ir al final del carrusel
      this.currentIndex = this.incidents.length - 1; 
    }
    this.updateCardCarousel();
  }

  deleteIncidentById(incidentId: string): void {
    Swal.fire({
      title: 'Desea eliminar esta incidencia?',
      showCancelButton: true,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.incidentService.deleteIncidentById(incidentId).subscribe(
          response => {
            console.log(response)
            Swal.fire('deleted', response.msg, 'success')
            this.incidents = this.incidents.filter(x => x._id !== incidentId)
            //redirecciona a las incidencias
            this.router.navigate(['/incident'])
          },
          error => {
            console.log(error)
          }
        )

      }
    });
  }

  get isUserAdministrator(): boolean {
    return this.authService.isUserAdministrator()
  }

  //llamar al boton de nueva incidencia
  getNewIncident(): void {
    console.log(this.router)
    this.router.navigate(['/new-incident'])
  }


}

