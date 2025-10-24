import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-post-modal',
  imports: [],
  templateUrl: './post-modal.html',
  styleUrl: './post-modal.scss'
})
export class PostModal {
  @Input() postTitle!: string;
  @Input() postDescription!: string;
  @Output() close = new EventEmitter<boolean>();

  closePopUp(data: boolean): void { // Emits boolean Value to Close Pop Up
    this.close.emit(data)
  }
}
