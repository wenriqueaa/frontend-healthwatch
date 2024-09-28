import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IncidentService } from '../../services/incident.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-new-incident',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './new-incident.component.html',
  styleUrl: './new-incident.component.css'
})
export class NewIncidentComponent implements OnInit {

  formIncident!: FormGroup
  title!: string
  isEditing: boolean = false
  btnText: string = 'Nueva'
  // forma nueva de injectar dependencias
  private route = inject(ActivatedRoute)


  constructor(
    private router: Router,
    private incidentService: IncidentService,
    private fb: FormBuilder,
  ) {
    this.formIncident = this.fb.group({
      nameIncident: ['', [Validators.required]],
      description: ['', [Validators.required]],
      incubationIncident: ['', [Validators.required]],
      recoveryIncident: ['', [Validators.required]],
      sourceIncident: ['', [Validators.required]],
      imageIncident: ['', [Validators.required]],
      casesIncident: ['', [Validators.required]],
      urlSourceIncident: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    if (this.incidentId) {
      this.title = "Edicion Incidencia"
      this.isEditing = true
      this.btnText = 'Update'

      this.incidentService.getIncidentById(this.incidentId).subscribe(
        response => {
          //const data: any = response.incident
          console.log(response)
          this.formIncident.patchValue({
            ...response.incident
          })
        },
        error => {
          console.log(error)
        }
      )
    } else {
      this.title = "Nueva Incidencia"
      this.isEditing = false
      console.log(this.isEditing)
    }
  }

  incidentId = this.route.snapshot.paramMap.get("id")

  newIncident(): void {
    //activar el servicio register
    this.incidentService.register(this.formIncident.value).subscribe(
      response => {
        console.log('ejecutado desde respuesta nueva incidencia')
        console.log(response)
        if (response.ok) {
          Swal.fire('Incidencia registrada!..', response.msg, 'success')
          //redirecciona a las incidencias
          this.router.navigate(['/incident'])
        } else {
          Swal.fire('error!, desde registro de incidencia.', response.error.msg, 'error')
        }
      },
      error => {
        console.log('Ejecutado desde el error registro incidencia')
        console.log(error)
        Swal.fire('!!upss error, registro incidencia', error.error.msg, 'error')
      }
    )
  }

  updateIncidentById(incidentId: string | null, data: any): void {
    this.incidentService.updateIncidentById(incidentId, data).subscribe(
      response => {
        console.log('actualizado')
        //redirecciona a las incidencias
        this.router.navigate(['/incident'])

      },
      error => {
        console.log(error)
      }
    )
  }

  save(): void {
    if (this.isEditing) {
      this.updateIncidentById(this.incidentId, this.formIncident.value)
    } else {
      this.newIncident()
    }
  }

  cancelar(): void {
    //redirecciona a las incidencias
    this.router.navigate(['/incident'])
  }

}
