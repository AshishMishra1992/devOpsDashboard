import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  title = 'AdminDashboard';

  navigate(route: string) {
    if (route == "home") {
      this.router.navigate(['home'])
    } else if (route == "release") {
      this.router.navigate(['releaseChart'])
    }
  }
}
