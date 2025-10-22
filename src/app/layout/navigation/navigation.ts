import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from '../header/header';

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class Navigation {

  constructor(
    private router: Router,
    private header: Header
  ){}

  RedirectToUsers() {
    this.router.navigate(['/users']);
    this.header.ToggleOverlay();
  }

  RedirectToPosts() {
    this.router.navigate(['/posts']);
    this.header.ToggleOverlay();
  }
}
