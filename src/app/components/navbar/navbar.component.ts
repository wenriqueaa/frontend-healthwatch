import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuOpen: boolean = false;
  userName : string | null = null
  userRole : any = ''

  constructor(private router: Router, private authService: AuthService){}

  ngOnInit(): void  {
    // this.getUserName()
    this.authService.userName$.subscribe(username => {
      this.userName = username
    })
  }

toogleMenu() {
  this.isMenuOpen = !this.isMenuOpen
  console.log(this.isMenuOpen)
}

get isLoggedIn(): boolean {
  return this.authService.isLoggedIn()
}

logout() {
  this.authService.logout()
  this.router.navigate(['/login'])
}

getUserName() {
  if (this.authService.isUserAdministrator()) {
    this.userName =  `${this.authService.getUserName()}(admin)`     
  } else {
    this.userName =  `${this.authService.getUserName()}`    
  }
  console.log('buscando userName')
  console.log(this.userName)
}

get isUserAdministrator(): boolean {
  return !this.authService.isUserAdministrator()
}


}
