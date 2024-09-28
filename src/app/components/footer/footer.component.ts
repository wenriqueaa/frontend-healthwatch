import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  
  constructor(private router: Router){}

  openInstagramlUrl(): void {
    window.open('https://www.instagram.com/mariamflorez/', '_blank', 'noopener,noreferrer');
  }

  openLinkedinUrl(): void {
    window.open('https://www.linkedin.com/in/mariamflorez/', '_blank', 'noopener,noreferrer');
  }

  openGithubUrl(): void {
    window.open('https://github.com/mariamfr', '_blank', 'noopener,noreferrer');
  }

}
