import { Component, EventEmitter, inject, Input, OnInit, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';
import { combineLatest, firstValueFrom } from 'rxjs';
import { PostsWithUserName } from '../../interfaces/postsWithUserName.interface';
import { Router } from '@angular/router';
import { PostModal } from "./post-modal/post-modal";

@Component({
  selector: 'app-table',
  imports: [CommonModule, PostModal],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table implements OnInit {

  userList = signal<any[]>([]);
  postListWithUserName = signal<PostsWithUserName[]>([]);
  postDetailsPopUp = signal<boolean>(false)

  private _users = inject(UsersService)
  private _posts = inject(PostsService)
  private _router = inject(Router)

  selectedPostTitle: string = '';
  selectedPostDescription: string = '';

  ngOnInit(): void {

    this.getUsers();

    this.getPostsWithUserName();

  }  

  getUsers() { // Get All User Data
    this._users.getUsers()
    .subscribe(
      {
        next: (data) => {
          this.userList.set(data);
        },
        error: (error) => {
          console.error(error);
        }
      }
    )
  }

  getPostsWithUserName() { // Get All Post Data With UserName Inserted
    combineLatest([
      this._posts.GetPosts(),
      this._users.getUsers()
    ])
    .subscribe(([posts, users]) =>{
      const merged: PostsWithUserName[] = posts.map((post: { id: number; title: string; body: string; userId: number; }) => ({
        id: post.id,
        title: post.title,
        body: post.body,
        userId: post.userId,
        userName: users.find((users: { id: number; }) => users.id === post.userId)?.name || 'UserNotFound'
      }))

      this.postListWithUserName.set(merged)
    })
  }

  redirectToUserPosts(userId: number): void { // Routes to Posts Filtered By User
    if (userId){
      this._router.navigate(['/posts', userId])
    }
    else{
      return;
    }
  }

  redirectToUserToDo(userId: number): void { // Routes to User's Todo List
    
    this._router.navigate([`/todo`, userId]);
  }

  togglePostPopUp(postTitle: string, postBody: string): void { // Enables Post Details Pop Up
    this.postDetailsPopUp.set(true)

    this.selectedPostTitle = postTitle;
    this.selectedPostDescription = postBody
  }
  
  closePostPopUp(data: any): void{ // Disables Post Details Pop Up
    this.postDetailsPopUp.set(data)
  }

  trackByID(index: number, data: any): number { // TrackBy For Loop
    return data.id
  }
}
