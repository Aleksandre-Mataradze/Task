import { Component, inject, OnInit, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users implements OnInit {

  users = signal<any[]>([]);

  private usersService = inject(UsersService);
  private router = inject(Router);

  ngOnInit(): void {
    this.usersService.getUsers()
    .subscribe({
      next: (data) => {
        this.users.set(data);
      },
      error: (error) => console.error(error)
    });
  }

  trackByID(index: number, user: any): number {
    return user.id
  }

  redirectToUserPosts(userId: number): void {
    if (userId){
      this.router.navigate(['/posts', userId])
    }
    else{
      return;
    }
  }
}
