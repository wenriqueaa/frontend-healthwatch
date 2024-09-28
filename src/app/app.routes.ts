import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ServiceComponent } from './components/service/service.component';
import { GeojsonListComponent } from './components/geojson-list/geojson-list.component';
import { IncidentComponent } from './components/incident/incident.component';
import { AlertComponent } from './protected/alert/alert.component';
import { AuthGuard } from './guards/auth.guard';
import { SynchronizeDataComponent } from './components/synchronize-data/synchronize-data.component';
import { NewAlertComponent } from './protected/new-alert/new-alert.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
// import { MapTestComponent } from './components/map-test/map-test.component';
import { NewIncidentComponent } from './protected/new-incident/new-incident.component';


export const routes: Routes = [
    {path:"", title:"Home", component: HomeComponent},
    {path:"login", title:"Login", component:LoginComponent},
    {path:"service", title:"Servicios", component:ServiceComponent},
    {path:"incident", title:"Incidencias", component:IncidentComponent},
    {path:"alert", title:"Alertas", component:AlertComponent, canActivate:[AuthGuard]},
    {path:"geojson-list", title:"List Servicios", component:GeojsonListComponent},
    {path:"synchronize-data", title:"Sincronizar Data", component:SynchronizeDataComponent},
    {path:"new-alert", title:"Nueva Alerta", component:NewAlertComponent},
    {path:"about-us", title:"A cerca de", component:AboutUsComponent},
    // {path:"maptest", title:"Test de Mapa", component:MapTestComponent},
    {path:"new-incident", title:"Nueva Incidencia", component:NewIncidentComponent},
    {path:"edit-incident/:id", title:"Editar Incidencia", component:NewIncidentComponent}
    

];
