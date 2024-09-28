import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-test',
  standalone: true,
  imports: [],
  templateUrl: './map-test.component.html',
  styleUrl: './map-test.component.css'
})

export class MapTestComponent implements AfterViewInit {

  private map: L.Map  = L.map('map', {
     center: [0, 0],
     zoom: 2
   })
  ;

  constructor(private router : Router) { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [4.6533326, -74.083652], // Coordenadas iniciales
      zoom: 12
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

     this.addMarkers();
   }

   private addMarkers(): void {
    const locations = [
      { lat: 4.6533326, lng: -74.083652 }, // Ejemplo de coordenadas para cada marca
      { lat: 4.6543326, lng: -74.084652 },
      { lat: 4.6553326, lng: -74.085652 },
      { lat: 4.6563326, lng: -74.086652 },
      { lat: 4.6573326, lng: -74.087652 },
    ];

  //   locations.forEach(location => {
  //     L.marker([location.lat, location.lng]).addTo(this.map);
  //   });
    
  //   this.map.invalidateSize();
   }

}

	