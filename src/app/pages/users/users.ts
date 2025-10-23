import { Component, inject, OnInit, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchBar } from "../../shared/search-bar/search-bar";
import { map } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [CommonModule, SearchBar],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users implements OnInit {

  users = signal<any[]>([]);

  private usersService = inject(UsersService);
  private router = inject(Router);

  ngOnInit(): void {

    this.getUsers()

  }

  getUsers(userList?: number[]): void{

    if(userList && userList.length > 0){ // Displays Users By Search Input

      const userIds = userList.map((user: any) => user.id)

      this.usersService.getUsers()
      .pipe(
        map( users => users.filter((u: any) => userIds.includes(u.id)))
      ).subscribe({
        next: (data) => {
          this.users.set(data)
        }
      })
    }else{ // Displays All Users
      this.usersService.getUsers()
      .subscribe({
        next: (data) => {
          this.users.set(data);
        },
        error: (error) => console.error(error)
      });
    }
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
