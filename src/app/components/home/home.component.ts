import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import * as L from 'leaflet';
// import * as A from "leaflet.awesome-markers/dist/leaflet.awesome-markers";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private mapHome!: L.Map;
  private geoJsonDataHome = [{ nameCollection: "", averageLatitude: 0, averageLongitude: 0, totalFeatures: 0 }]
  private coordinateCenterBogota: L.LatLng = L.latLng(4.657900000000, -74.157000000000);
  constructor(private router: Router, private authService: AuthService) { }

  ngAfterViewInit(): void {
    this.initMap()
  }

  private initMap(): void {
    // Inicializar Arreglo
    while (this.geoJsonDataHome.length > 0) {
      this.geoJsonDataHome.pop()
    }

    // Obtener la data
    this.authService.dataService('statservicehealt').subscribe(
      response => {
        this.geoJsonDataHome = response
        this.createMap()
        console.log('response this.geoJsonDataHome ', response, this.geoJsonDataHome)
      }, error => {
        console.info(`statservicehealt home.component error`, error.msg)
      }
    )
  }
  private createMap(): void {    // gestionar la marcas en el mapa
    let marker!: L.Marker;
    let circle!: L.CircleMarker;
    const icons = [
      L.divIcon({
        html: '<i class="fa-solid fa-truck-droplet" style="font-size:16px;color:red;"></i>',
        className: '' // Importante: eliminar las clases predeterminadas para un diseño limpio
      }),
      L.divIcon({
        html: '<i class="fa-solid fa-user-doctor style="font-size:32px;color:green;"></i>',
        className: '' // Importante: eliminar las clases predeterminadas para un diseño limpio
      }),
      L.divIcon({
        html: '<i class="fa-solid fa-prescription-bottle-medical style="font-size:32px;color:blue;"></i>',
        className: '' // Importante: eliminar las clases predeterminadas para un diseño limpio
      }),
      L.divIcon({
        html: '<i class="fa-solid fa-file-waveform style="font-size:32px;color:brown;"></i>',
        className: '' // Importante: eliminar las clases predeterminadas para un diseño limpio
      }),
      L.divIcon({
        html: '<i class="fa-solid fa-file-medical style="font-size:32px;color:lightblue;"></i>',
        className: '' // Importante: eliminar las clases predeterminadas para un diseño limpio
      }),
      L.divIcon({
        html: '<i class="fa-solid fa-house-medical style="font-size:32px;color:lightgreen;"></i>',
        className: '' // Importante: eliminar las clases predeterminadas para un diseño limpio
      }),
      L.divIcon({
        html: '<i class="fa-solid fa-notes-medical style="font-size:32px;color:lightred;"></i>',
        className: '' // Importante: eliminar las clases predeterminadas para un diseño limpio
      }),
      L.divIcon({
        html: '<i class="fa-solid fa-hand-holding-medical style="font-size:32px;color:lightbrown;"></i>',
        className: '' // Importante: eliminar las clases predeterminadas para un diseño limpio
      }),
      L.divIcon({
        html: '<i class="fa-solid fa-syringe style="font-size:32px;color:blue;"></i>',
        className: '' // Importante: eliminar las clases predeterminadas para un diseño limpio
      }),
      L.divIcon({
        html: '<i class="fa-solid fa-suitcase-medical style="font-size:32px;color:blue;"></i>',
        className: '' // Importante: eliminar las clases predeterminadas para un diseño limpio
      })]
    let serviceIconHtml = '<i class="fa-solid fa-laptop-medical" style="font-size:24px;color:blue;">';
    let serviceIcon: L.DivIcon = L.divIcon({
      html: serviceIconHtml,
      className: '' // Importante: eliminar las clases predeterminadas para un diseño limpio
    });
    //   const icons = [icon({
    //     icon: "spinner",
    //     markerColor: "red",
    //     prefix: "fa",
    //     spin: true
    //   }),
    // A.AwesomeMarkers.icon({
    //     icon: "coffee",
    //     markerColor: "orange",
    //     prefix: "fa",
    //     iconColor: "black"
    //   })
    // ,
    //  A.AwesomeMarkers.icon({
    //     icon: "cog",
    //     prefix: "fa",
    //     markerColor: "purple",
    //     iconColor: "#6b1d5c"
    //   })
    // ,
    // A.AwesomeMarkers.icon({
    //     icon: "star",
    //     prefix: "glyphicon",
    //     markerColor: "green"
    //   })
    // ,
    // A.AwesomeMarkers.icon({
    //     icon: "certificate",
    //     prefix: "glyphicon",
    //     markerColor: "blue"
    //   })
    // ,
    // A.AwesomeMarkers.icon({
    //     icon: "cog",
    //     prefix: "glyphicon",
    //     markerColor: "cadetblue"
    //   })
    // ]
    let personIconHtml = '<i class="fas fa-user" style="font-size:24px;color:green;"></i>';
    let personIcon: L.DivIcon = L.divIcon({
      html: personIconHtml,
      className: '' // Importante: eliminar las clases predeterminadas para un diseño limpio
    });

    const coordinates: L.LatLngExpression[] = [
      [4.657900000000, -74.157000000000],
      [4.675886432118, -74.157000000000],
      [4.671678406376, -74.145400234033],
      [4.661023311160, -74.139228127479],
      [4.648906783941, -74.141371677590],
      [4.640998282464, -74.150827893446],
      [4.640998282464, -74.163172106554],
      [4.648906783941, -74.172628322410],
      [4.661023311160, -74.174771872521],
      [4.671678406376, -74.168599765967]
    ];

    const iconRetinaUrl = "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png";
    const iconUrl = 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png';
    const shadowUrl = 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;    // const icon = new L.Icon({
    this.mapHome = L.map('mapHome').setView(this.coordinateCenterBogota, 12);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 8,
      attribution: '&copy; <a href="https://datosabiertos.bogota.gov.co">datosabiertos.bogota.gov.co</a>'
    });

    tiles.addTo(this.mapHome);
    let midPointLat = 0
    let midPointLng = 0
    let totalGlobal = 0
    let count = 0
    // let distance = 2000
    this.geoJsonDataHome.forEach(geoJsonItem => {
      totalGlobal += geoJsonItem.totalFeatures
    })

    let maxRadius = 80
    count = 0
    let messageHTML = `<b>datosabiertos.bogota.gov.co</b>`
    this.geoJsonDataHome.forEach(geoJsonItem => {
      const geoJsonPosition: L.LatLngExpression = coordinates[(count % 9) + 1];
      count += 1
      // coordinates.push(geoJsonPosition)
      let marker = L.marker(geoJsonPosition, { icon: icons[count - 1] });
      let message = `<br/><i class="fa-solid fa-laptop-medical"></i> - - ${geoJsonItem.nameCollection} Total: ${geoJsonItem.totalFeatures}`
      messageHTML = messageHTML + message
      marker.bindPopup(`<b>${message}</b>`)
      marker.addTo(this.mapHome);    // 
      let applyRadius = maxRadius * geoJsonItem.totalFeatures / totalGlobal
      circle = L.circleMarker(geoJsonPosition, { radius: applyRadius })
      circle.addTo(this.mapHome);
    })
    // Create a bounds object that includes both markers
    let bounds = L.latLngBounds(coordinates);

    //Dibujar punto medio que posteriormente será la posición del usuario
    circle = L.circleMarker(this.coordinateCenterBogota, {
      radius: 10,
      color: 'green',  // Color del borde
      fillColor: '#f03',  // Color de relleno
      fillOpacity: 1.0  // Opacidad del relleno
    })
    marker = L.marker(this.coordinateCenterBogota, { icon: personIcon });
    marker.bindPopup(`${messageHTML}`)
    marker.addTo(this.mapHome);
    // this.marker.bindPopup('<b>Entidades</b>').openPopup()

    let zoom = 14
    this.mapHome.flyToBounds(bounds, { padding: [5, 5], maxZoom: zoom });

  }


}
