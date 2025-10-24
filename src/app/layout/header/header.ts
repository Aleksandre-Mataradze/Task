import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Navigation } from "../navigation/navigation";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [DatePipe, Navigation],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {

 currentDate = signal(new Date());
 overlayIsActive = signal(false);

 private _router = inject(Router)

  ngOnInit(): void {
    setInterval(() => this.currentDate.set(new Date()), 1000); // Update Date & Time every second
  }

 RedirectToHome() { // Redirects to Home Page
  this._router.navigate(['']);
 }

 ToggleOverlay() { // Enables/Disables Navigation Overlay
  this.overlayIsActive.update(value => !value);
 }

}
