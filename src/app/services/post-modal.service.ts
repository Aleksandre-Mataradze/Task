import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostModalService {

  closePostDetailsPopUp$ = new Subject<boolean>();
  postIdSubject = new Subject<number>();
  postId$ = this.postIdSubject.asObservable();

  closePopUp(): void {
    this.closePostDetailsPopUp$.next(false);
  }

  setPostId(postId: number): void{
    this.postIdSubject.next(postId)
    console.log("setPostId:", postId)
  }

  streamPostId(): Observable<number>{
    return this.postId$;
  }
}