import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
// import { DatosabiertosService } from '../../services/datosabiertos.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-synchronize-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './synchronize-data.component.html',
  styleUrl: './synchronize-data.component.css'
})

export class SynchronizeDataComponent implements OnInit {
  data: any = {}
  resultSynchronizeData: string = '';
  private dataPublicAvailable: boolean = false
  url: string = 'https://datosabiertos.bogota.gov.co/dataset/53472aaa-2b4f-4b15-8e43-3a243b518ca1/resource/b80a3352-b9b8-42e8-a007-66f665515dc0/download/bancosangre.geojson'
  private dataDb: any = [];

  constructor( private router: Router, private authService: AuthService) { }
  ngOnInit(): void {
    this.loadDataInDb()
    // this.firstTenFeatures = this.geojsonService.getFirstTenFeatures('bancoSangre'); // Pass the collection name here
  }

  // getAllData(): void {
  //   this.dataPublicAvailable = false
  //   this.resultSynchronizeData = ''
  //   // let response = this.datosabiertosService.getData(this.url)
  //   //   // response => {
  //   //     console.log('response', response)
  //   //     this.data = response
  //   //     this.dataPublicAvailable = true
  //   //   },
  //   //   error => {
  //   //     console.log('error', error)
  //   //     this.resultSynchronizeData = 'falla en https://datosabiertos.bogota.gov.co: ' + error.name
  //   //   }
  //   // )
  // }


  loadDataInDb(): void {
    // this.authService.bancoSangre().subscribe(
    //   //subscribe recibe dos parametros, responsive, error
    //   response => {
    //     console.log(response)
    //     if (response.ok) {
    //       this.dataDb = response.data
    //       console.log(`.bancoSangre() synchronize-data.component response ok`, this.dataDb)
    //       console.log('response.data ', response.data)
    //     } else {
    //       this.dataDb = []
    //       console.log(`loadBancoSangre() synchronize-data.component response error`, response.msg)//Swal.fire('Upps errores', response.response.msg, 'error')
    //     }
    //   }, error => {
    //     this.dataDb = []
    //     console.error(`loadBancoSangre() synchronize-data.component error`, error.msg)
    //   }
    // )
  }


  synchronizeData(nameService: string): void {
    let urlData: string = ''
    let applySynchronization: boolean = false
    console.log('A. synchronizeData(%s)', nameService);
    switch (nameService) {
      case 'bancosangre':
        // Código para manejar la opción 'bancosangre'
        // console.log('Seleccionaste bancosangre');
        urlData = 'https://datosabiertos.bogota.gov.co/dataset/53472aaa-2b4f-4b15-8e43-3a243b518ca1/resource/b80a3352-b9b8-42e8-a007-66f665515dc0/download/bancosangre.geojson'
        applySynchronization = true
        break;
      case 'consultoriomedico':
        // Código para manejar la opción 'consultoriomedico'
        // console.log('Seleccionaste consultoriomedico');
        urlData = 'https://datosabiertos.bogota.gov.co/dataset/d727ef96-d9e4-4f18-a60e-d4bfc9e7dd7d/resource/55419556-fe94-412d-aba0-780214c240c7/download/cons.geojson'
        applySynchronization = true
        break;
      case 'entidadfarmaceutica':
        // Código para manejar la opción 'entidadfarmaceutica'
        // console.log('Seleccionaste entidadfarmaceutica');
        urlData = 'https://datosabiertos.bogota.gov.co/dataset/bb3ebd5d-9b9b-4be6-ab42-b4ab2bd98214/resource/25bc32fc-b377-4b78-a87a-d62b7b962998/download/efar.geojson'
        applySynchronization = true
        break;
      case 'eps':
        // Código para manejar la opción 'eps'
        // console.log('Seleccionaste eps');
        urlData = 'https://datosabiertos.bogota.gov.co/dataset/c9cc72c9-4242-4a57-b86d-d377de88b558/resource/838967cb-47dd-4567-b41c-62d3103ecfaa/download/eps.geojson'
        applySynchronization = true
        break;
      case 'ips':
        // Código para manejar la opción 'ips'
        // console.log('Seleccionaste ips');
        urlData = 'https://datosabiertos.bogota.gov.co/dataset/fc66362f-ba91-4d7a-af9c-d0b3d3a60106/resource/0e432b79-8c0f-4a0c-a592-43330712fe03/download/ips.geojson'
        applySynchronization = true
        break;
      case 'redadscritasalud':
        // Código para manejar la opción 'redadscritasalud'
        // console.log('Seleccionaste redadscritasalud');
        urlData = 'https://datosabiertos.bogota.gov.co/dataset/057e1a9c-2906-4ea2-bc40-de5120f770ce/resource/92d564f2-5af8-406a-a36f-fb7e1d7ef61d/download/rasa.geojson'
        applySynchronization = true
        break;
      case 'transfusionsanguinea':
        // Código para manejar la opción 'transfusionsanguinea'
        // console.log('Seleccionaste transfusionsanguinea');
        urlData = 'https://datosabiertos.bogota.gov.co/dataset/42c05920-1e8a-41ac-9795-7078512e285a/resource/e7e6f5da-bae5-4b70-8c50-3dd19b1dd8b9/download/stsa.geojson'
        applySynchronization = true
        break;
      case 'transporteespecialpaciente':
        // Código para manejar la opción 'transporteespecialpaciente'
        // console.log('Seleccionaste transporteespecialpaciente');
        urlData = 'https://datosabiertos.bogota.gov.co/api/3/action/datastore_search?resource_id=68d7345c-e77f-4e83-a2f5-d398ecbaa82e&limit=250'
        applySynchronization = true
        break;
      case 'upi':
        // Código para manejar la opción 'upi'
        // console.log('Seleccionaste upi');
        urlData = 'https://datosabiertos.bogota.gov.co/dataset/d0640cd2-00ed-4bcb-9ba2-12f3ced7a8f8/resource/dc8e76fc-33c4-4a23-b187-f1387748df3b/download/upi_12_2022.geojson'
        applySynchronization = true
        break;
      case 'vacunafiebre':
        // Código para manejar la opción 'vacunafiebre'
        // console.log('Seleccionaste vacunafiebre');
        urlData = 'https://datosabiertos.bogota.gov.co/dataset/3c527716-6b5b-46d3-a3d7-fcd918ba7ccb/resource/67abf906-6b52-4064-b0a8-8e3fcd39a1a7/download/vacunafiebre.geojson'
        applySynchronization = true
        break;
      default:
        // Código para manejar cualquier opción no contemplada
        console.log('B. Opción no reconocida');
        break;
    }
    if (applySynchronization) {
      console.log('C.01 synchronizationData()', nameService)
      console.log('C.02 synchronizationData()', urlData)
      this.authService.synchronizationData(nameService).subscribe(
        //subscribe recibe dos parametros, responsive, error
        response => {
          console.log(response)
          if (response.ok) {
            console.log(`'C.03 synchronizationData() synchronize-data.component response ok`, response)
            this.resultSynchronizeData = response.msg
          } else {
            console.log(`C.03 synchronizationData() synchronize-data.component response error`, response.msg)
            this.resultSynchronizeData = `Fallo en actualización Base de Datos ` + response.msg
          }
        }, error => {
          console.error(`C.03 synchronizationData() synchronize-data.component error`, error)
          this.resultSynchronizeData = `Fallo en actualización Base de Datos ` + error
        }
      )
       }
       else {
        console.log('D. Not applySynchronization', applySynchronization)
       }
  }
  loadDataServiceFromDb(nameService: string): void {
    // this.authService.dataService(nameService).subscribe(
    //   //subscribe recibe dos parametros, responsive, error
    //   response => {
    //     console.log(response)
    //     if (response.ok) {
    //       this.dataDb = response.data
    //       console.log('loadDataServiceFromDb synchronize-data.component response ok', nameService, this.dataDb)
    //       console.log('loadDataServiceFromDb response.data ', response.data)
    //     } else {
    //       this.dataDb = []
    //       console.log(`loadDataServiceFromDb() synchronize-data.component response error`, response.msg)//Swal.fire('Upps errores', response.response.msg, 'error')
    //     }
    //   }, error => {
    //     this.dataDb = []
    //     console.error(`loadDataServiceFromDb() synchronize-data.component error`, error.msg)
    //   }
    // )
  }

}
