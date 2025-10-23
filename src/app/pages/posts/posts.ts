import { Component, inject, signal } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-posts',
  imports: [CommonModule],
  templateUrl: './posts.html',
  styleUrl: './posts.scss'
})
export class Posts {
  
  posts = signal<any[] | any>([]);

  userId: number | null = null;
  
  private postService = inject(PostsService);

  private _route = inject(ActivatedRoute)


  ngOnInit(): void {

    this.redirectToUserPosts()

  }

  redirectToUserPosts(): void{

    if (this._route.snapshot.paramMap.get('userId')) { // Check if userId parameter exists
      this.userId = Number(this._route.snapshot.paramMap.get('userId'));

      this.postService.GetPosts(this.userId)
      .pipe(
        map(post => post.filter((post: any) => post.userId === this.userId)) // Filter posts by userId
      )
      .subscribe({
        next: (data) => {
          this.posts.set(data);
        }
      })
    }
    else{ // If no userId parameter, fetch all posts
    this.postService.GetPosts()
    .subscribe({
      next: (data) => {
        this.posts.set(data);
        console.log(data)
      },
      error: (error) => console.error(error)
    });
    }
  }

  trackByID(index: number, post: any): number {
    return post.id
  }
}
