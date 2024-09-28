import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-geojson-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './geojson-list.component.html',
  styleUrl: './geojson-list.component.css'
})
export class GeojsonListComponent implements OnInit {

  public firstTenFeatures: any[] = [];


  constructor(private router: Router, private authService: AuthService) {}

  private dataBancoSangre: any[] = [];
  ngOnInit(): void {
    this.loadBancoSangre()
    // this.firstTenFeatures = this.geojsonService.getFirstTenFeatures('bancoSangre'); // Pass the collection name here
  }
  loadBancoSangre(): void {
    this.dataBancoSangre = []
    this.authService.bancoSangre().subscribe(
    //subscribe recibe dos parametros, responsive, error
    response => {
      console.log(response)
      if(response.ok){
        this.dataBancoSangre = response.data
         console.log(`loadBancoSangre() geojson-list.component response ok`, this.dataBancoSangre)
        } else {
          console.log(`loadBancoSangre() geojson-list.component response error`, response.msg )//Swal.fire('Upps errores', response.response.msg, 'error')
        }
    }, error => {
      console.error(`loadBancoSangre() geojson-list.component error`, error )
    }
  ) 
  }

  searchInCollection(collectionName: string): void {

    // const features = this.geojsonService.getFirstTenFeatures(collectionName);
    // if (features.length > 0) {
       this.firstTenFeatures = this.dataBancoSangre.slice(0,10);
    // } else {
    //   // Handle the case where the collection is not found or empty
      //  console.warn(`No features found for collection ${collectionName}`);
    // }
  }
  getFirstTenFeatures() : void {
    this.firstTenFeatures = this.dataBancoSangre.slice(0,10);
  }


}
