import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent  {
  private geoJsonData = {
    "type": "",
    "name": "",
    "crs": { "type": "", "properties": { "name": "" } },
    "features": [
      { "type": "", "properties": { "ID": 0, "UPZ": "", "LOCALIDAD": "", "RSOCIAL": "", "DIRECCION": "", "BARRIO": "", "TELEFONO": ""
        , "DRO24HORAS": "", "ENTREPORTA": "", "TESTABLECI": "" }, "geometry": { "type": "", "coordinates": [0, 0] } }
    ]} // private geoJsonData
private map!: L.Map;
  private marker!: L.Marker;
  private circle!: L.CircleMarker;
  private serviceIconHtml = '<i class="fas fa-clinic-medical" style="font-size:24px;color:blue;">';
  private serviceIcon: L.DivIcon = L.divIcon({
    html: this.serviceIconHtml,
    className: '' // Importante: eliminar las clases predeterminadas para un diseño limpio
  });

  private personIconHtml = '<i class="fas fa-user" style="font-size:24px;color:green;"></i>';
  private personIcon: L.DivIcon = L.divIcon({
    html: this.personIconHtml,
    className: '' // Importante: eliminar las clases predeterminadas para un diseño limpio
  });
  private initMap(): void {

    // Obtener la data
    this.authService.dataService('entidadfarmaceutica').subscribe(
      response => {
        this.geoJsonData.features = response.data
        this.createMap()
        console.log('response this.geoJsonData ', response, this.geoJsonData)
      }, error => {
        console.info(`entidadfarmaceutica service.component error`, error.msg)
      }
    )

      }  
      private createMap(): void {    // gestionar la marcas en el mapa
        let coordinates: L.LatLngExpression[] = [];

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
    this.map = L.map('map').setView([4.7043, -74.0601], 12);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 12,
      attribution: '&copy; <a href="https://datosabiertos.bogota.gov.co">datosabiertos.bogota.gov.co</a>'
    });

    tiles.addTo(this.map);
    this.geoJsonData.features.forEach((feature, index) => {
      const coordinate = feature.geometry.coordinates;
      const geoJsonPosition: L.LatLngExpression = [coordinate[1], coordinate[0]];
      // console.info('coordinate feature geoJsonPosition', coordinate, feature, geoJsonPosition)
      coordinates.push(geoJsonPosition)
      // console.info('index Cargado ', index, coordinates)
      let marker = L.marker(geoJsonPosition, { icon: this.serviceIcon });
      marker.bindPopup(`<i class="fas fa-pills"></i><b>${feature.properties.RSOCIAL}</b>
        <br/>Dir: ${feature.properties.DIRECCION}
        <br/>Tel:  ${feature.properties.TELEFONO}
        <br/>Tipo:  ${feature.properties.TESTABLECI}`)
      marker.addTo(this.map);    //  marker = L.marker([4.6043, -73.0601]);
      let circle = L.circleMarker(geoJsonPosition, { radius: 5 })
      circle.addTo(this.map);
    })

    // Create a bounds object that includes both markers
    let bounds = L.latLngBounds(coordinates);

    // Adjust the map view to fit the bounds
    //this.map.fitBounds(bounds);
    // Adjust the map view to fit the bounds
    let midPoint = this.calculateMidpoint(coordinates);
    let midPointLatLng: L.LatLng = L.latLng([0, 0])
    if (Array.isArray(midPoint)) {
      midPointLatLng = L.latLng([midPoint[0], midPoint[1]]);
    } else if (typeof midPoint === 'object' && 'lat' in midPoint && 'lng' in midPoint) {
      midPointLatLng = L.latLng([midPoint.lat, midPoint.lng]);
    }

    console.info('this.calculateMidpoint', coordinates, midPoint)
    const closestFeature = this.findClosestFeatureToPoint(midPoint, coordinates)
    let distance = this.checkProximity(midPointLatLng, closestFeature)
    let UsePoint= midPoint
    if(distance<=300){
        distance = 300
      }
    else{UsePoint= closestFeature}
    
    //  marker.marker(coords, { icon }).addTo(this.map);
    const coodinatesbounds = this.getBoundsWithMargin(coordinates, midPoint, distance); // 500 metros de margen


    //Dibujar punto medio que posteriormente será la posición del usuario
    coordinates.push(midPoint)
    console.log('Punto medio:', midPoint);
    this.circle = L.circleMarker(midPoint, {
      radius: 5,
      color: 'green',  // Color del borde
      fillColor: '#f03',  // Color de relleno
      fillOpacity: 1.0  // Opacidad del relleno

    })
    this.marker = L.marker(midPoint, { icon: this.personIcon });
    this.marker.bindPopup(`<i class="fas fa-user" style="color:green;"></i><b>Muy pronto su geo posición</b>`)
  this.marker.addTo(this.map);
    // this.marker.bindPopup('<b>Entidades</b>').openPopup()

    this.map.fitBounds(bounds);
    // this.map.flyTo(midPoint, this.map.getZoom());
    let zoom = 18 - 2 * Math.floor(distance / 300 ) 
    console.info( 'zoom', zoom, distance )
    if(zoom<14){zoom=14}
    this.map.flyToBounds(coodinatesbounds, { padding: [5, 5], maxZoom: zoom });
  }

  constructor(private router: Router, private authService: AuthService) { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  calculateMidpoint(coordiantesReceived: L.LatLngExpression[]): L.LatLngExpression {
    let latSum = 0;
    let lngSum = 0;
    console.info('calculateMidpoint()', coordiantesReceived)
    coordiantesReceived.forEach(coordianteReceived => {
      // coordianteReceived puede ser un array [lat, lng], un objeto LatLng, o una tupla [lat, lng]
      if (Array.isArray(coordianteReceived)) {
        latSum += coordianteReceived[0];
        lngSum += coordianteReceived[1];
      } else if (typeof coordianteReceived === 'object' && 'lat' in coordianteReceived && 'lng' in coordianteReceived) {
        latSum += coordianteReceived.lat;
        lngSum += coordianteReceived.lng;
      }
    });

    const avgLat = latSum / coordiantesReceived.length;
    const avgLng = lngSum / coordiantesReceived.length;

    return [avgLat, avgLng] as L.LatLngExpression;
  }

  getBoundsWithMargin(coordianteReceived: L.LatLngExpression[], midPoint: L.LatLngExpression, radius: number): L.LatLngBounds {
    let latMin = Infinity, latMax = -Infinity, lngMin = Infinity, lngMax = -Infinity;
    let reviewMidPoint = L.latLng([0, 0]);
    if (Array.isArray(midPoint)) {
      reviewMidPoint = L.latLng([midPoint[0], midPoint[1]]);
    } else if (typeof midPoint === 'object' && 'lat' in midPoint && 'lng' in midPoint) {
      reviewMidPoint = L.latLng([midPoint.lat, midPoint.lng]);
    }

    coordianteReceived.forEach(coordianteReceived => {
      let lat: number = 0
      let lng: number = 0
      if (Array.isArray(coordianteReceived)) {
        lat = coordianteReceived[0];
        lng = coordianteReceived[1];
      } else if (typeof coordianteReceived === 'object' && 'lat' in coordianteReceived && 'lng' in coordianteReceived) {
        lat = coordianteReceived.lat;
        lng = coordianteReceived.lng;
      }
      const reviewCoordianteReceived = L.latLng([lat, lng]);
      const distance = this.checkProximity(reviewMidPoint, reviewCoordianteReceived)
      if (distance <= radius) {
        latMin = Math.min(latMin, lat);
        latMax = Math.max(latMax, lat);
        lngMin = Math.min(lngMin, lng);
        lngMax = Math.max(lngMax, lng);
        console.log('Encontrado Los puntos y distancia.', midPoint, reviewCoordianteReceived, distance);
        if (reviewMidPoint.lat != lat || reviewMidPoint.lng != lng) {
          this.circle = L.circleMarker(reviewCoordianteReceived, {
            radius: 10,
            color: 'red',  // Color del borde
            fillColor: '#f03',  // Color de relleno
            fillOpacity: 0.5  // Opacidad del relleno
          })
          this.circle.addTo(this.map);
        }

      }
      else {
        //  console.log('Descartado Los puntos y distancia.', midPoint, reviewCoordianteReceived, distance );
        latMin = Math.min(latMin, reviewMidPoint.lat);
        latMax = Math.max(latMax, reviewMidPoint.lat);
        lngMin = Math.min(lngMin, reviewMidPoint.lng);
        lngMax = Math.max(lngMax, reviewMidPoint.lng);
      }
    });

    const latMargin = reviewMidPoint.lat / 111320; // Aproximadamente 111.32 km por grado de latitud
    const lngMargin = reviewMidPoint.lat / (111320 * Math.cos((latMin + latMax) / 2 * (Math.PI / 180))); // Ajusta por longitud

    const southWest = [latMin - latMargin, lngMin - lngMargin] as L.LatLngExpression;
    const northEast = [latMax + latMargin, lngMax + lngMargin] as L.LatLngExpression;

    return new L.LatLngBounds(southWest, northEast);
  }
  private checkProximity(geoJsonPositionOne: L.LatLng, geoJsonPositionTwo: L.LatLng): number {

    const distance = geoJsonPositionOne.distanceTo(geoJsonPositionTwo);
    return distance;
  }

  // // Función para encontrar la posición más cercana al punto medio
  private findClosestFeatureToPoint(midPoint: L.LatLngExpression, coordianteReceived: L.LatLngExpression[]): L.LatLng {
    let closestFeature = L.latLng([0, 0]);
    let smallestDistance = Infinity;
    let reviewMidPoint: L.LatLng;
    let distance = 0;
    if (Array.isArray(midPoint)) {
      reviewMidPoint = L.latLng([midPoint[0], midPoint[1]]);
    } else if (typeof midPoint === 'object' && 'lat' in midPoint && 'lng' in midPoint) {
      reviewMidPoint = L.latLng([midPoint.lat, midPoint.lng]);
    }
    // //    const reviewCoordianteReceived = L.latLng([lat, lng]);
    let reviewCoordianteReceived: L.LatLng;
    coordianteReceived.forEach(coordinate => {
      if (Array.isArray(coordinate)) {
        reviewCoordianteReceived = L.latLng([coordinate[0], coordinate[1]]);
      } else if (typeof coordinate === 'object' && 'lat' in coordinate && 'lng' in coordinate) {
        reviewCoordianteReceived = L.latLng([coordinate.lat, coordinate.lng])
      }
      distance = this.checkProximity(reviewMidPoint, reviewCoordianteReceived);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestFeature = reviewCoordianteReceived;
      }
    })

    return closestFeature;
  }
}

