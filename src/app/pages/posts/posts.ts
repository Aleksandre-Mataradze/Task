import { Component, inject, signal } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  imports: [CommonModule],
  templateUrl: './posts.html',
  styleUrl: './posts.scss'
})
export class Posts {
  
  posts = signal<any[]>([]);

  private postService = inject(PostsService);

  ngOnInit(): void {
    this.postService.getUsers()
    .subscribe({
      next: (data) => {
        console.log(data);
        this.posts.set(data);
      },
      error: (error) => console.error(error)
    });
  }

  trackByID(index: number, post: any): number {
    return post.id
  }
}
