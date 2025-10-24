import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from '../header/header';

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class Navigation {

  private _router = inject(Router)
  private _header = inject(Header)

  RedirectToUsers() { // Routes to Users Component
    this._router.navigate(['/users']);
    this._header.ToggleOverlay();
  }

  RedirectToPosts() { // Routes to Posts Component
    this._router.navigate(['/posts']);
    this._header.ToggleOverlay();
  }
}
