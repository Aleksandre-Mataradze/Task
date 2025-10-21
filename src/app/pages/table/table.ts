import { Component, inject, OnInit, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';
import { combineLatest, merge } from 'rxjs';
import { PostsWithUserName } from '../../interfaces/postsWithUserName.interface';
import { Router } from '@angular/router';
import { PostModal } from "../../shared/post-modal/post-modal";

@Component({
  selector: 'app-table',
  imports: [CommonModule, PostModal],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table implements OnInit {

  userList = signal<any[]>([]);
  postListWithUserName = signal<PostsWithUserName[]>([]);
  postPopUp = signal<boolean>(false)

  private users = inject(UsersService)
  private posts = inject(PostsService)
  private router = inject(Router)

  ngOnInit(): void {

    this.getUsers();

    this.getPostsWithUserName();
  }  

  getUsers() {
    this.users.getUsers()
    .subscribe(
      {
        next: (data) => {
          this.userList.set(data);
          console.log(data);
        },
        error: (error) => {
          console.error(error);
        }
      }
    )
  }

  getPostsWithUserName() {
    combineLatest([
      this.posts.GetPosts(),
      this.users.getUsers()
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
      console.log(this.postListWithUserName())
    })
  }

  getUserFullName(userId: number): string{
    const user = this.userList().find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  }

  redirectToUserPosts(userId: number): void {
    if (userId){
      this.router.navigate(['/posts', userId])
    }
    else{
      return;
    }
  }

  TogglePostPopUp(): void {
    this.postPopUp.set(true)
  }

    trackByID(index: number, data: any): number {
    return data.id
  }
}
