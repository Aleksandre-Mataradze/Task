import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class Navigation {

  constructor(private router: Router){}

  RedirectToUsers() {
    this.router.navigate(['/users']);
  }

  RedirectToPosts() {
    this.router.navigate(['/posts']);
  }
}
