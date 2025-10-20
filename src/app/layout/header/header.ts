import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Navigation } from "../navigation/navigation";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [DatePipe, Navigation],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

 currentDate = signal(new Date());
 menuIsActive = signal(false);
 overlayIsActive = signal(false);

 constructor(private router: Router) {
  setInterval(() => this.currentDate.set(new Date()), 1000); // Update Date & Time every second
 }

 RedirectToHome() {
  this.router.navigate(['']);
 }

 ToggleMenu() {
    this.menuIsActive.update(value => !value);
 }

 ToggleOverlay() {
  this.overlayIsActive.update(value => !value);
  console.log(this.overlayIsActive());
 }

}
