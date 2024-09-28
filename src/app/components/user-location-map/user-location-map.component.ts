import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';

// Opcional: Solucionar problemas con los íconos de Leaflet en Angular
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/marker-icon-2x.png',
  iconUrl: 'assets/marker-icon.png',
  shadowUrl: 'assets/marker-shadow.png',
});

@Component({
  selector: 'app-user-location-map',
  standalone: true,
  imports: [],
  templateUrl: './user-location-map.component.html',
  styleUrl: './user-location-map.component.css'
})

export class UserLocationMapComponent implements OnInit {

  private map: L.Map =  L.map('map', {
    center: [0, 0],
    zoom: 2
  });

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Inicializa el mapa centrado en coordenadas [0, 0] con zoom 2
    this.map = L.map('map', {
      center: [0, 0],
      zoom: 2
    });

    // Añade una capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Intenta obtener la ubicación del usuario
    this.map.locate({ setView: true, maxZoom: 16 });

    // Evento cuando se encuentra la ubicación
    this.map.on('locationfound', this.onLocationFound, this);

    // Evento para manejar errores en la geolocalización
    this.map.on('locationerror', this.onLocationError, this);
  }

  private onLocationFound(e: L.LocationEvent): void {
    const radius = e.accuracy;

    // Añade un marcador en la ubicación encontrada
    L.marker(e.latlng).addTo(this.map)
      .bindPopup('¡Estás aquí!').openPopup();

    // Dibuja un círculo que representa la precisión de la ubicación
    L.circle(e.latlng, radius).addTo(this.map);
  }

  private onLocationError(e: L.ErrorEvent): void {
    alert('No se pudo obtener tu ubicación: ' + e.message);
  }

}
