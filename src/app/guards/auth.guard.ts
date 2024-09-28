import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate(): boolean{
    //valida si existe un token
    const token = sessionStorage.getItem('token')
    if(token) {
      return true
    } else {
      this.router.navigate(['/login'])
      return false
    }

  }
  
}
