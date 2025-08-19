import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {
  navLinks = [
    { path: '', label: 'Home' },
    { path: 'store', label: 'Store' },
    { path: 'contact', label: 'Contact' },
    { path: 'about', label: 'About' },
    { path: 'single', label: 'Single' }
  ]
}
