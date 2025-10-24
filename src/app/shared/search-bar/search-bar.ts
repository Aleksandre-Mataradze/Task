import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SearchBarService } from '../../services/search-bar.service';
import { Users } from '../../pages/users/users';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss'
})
export class SearchBar implements OnInit{
  
  searchBar = new FormControl();

  private _searchBarService = inject(SearchBarService)
  private _usersComponent = inject(Users)

  ngOnInit(): void {

    this.catchInputData()

  }

  catchInputData(): void{ // Method That Catches Input and Calls User Component User Display By Input 
    
    this.searchBar.valueChanges
    .pipe(
      debounceTime(500), // Triggers Input After 0.5s inactivity
      distinctUntilChanged()
    ).subscribe({
      next: (data) => {

        if (data !== null && data.trim() !== ''){ // If data exists calls search bar service
          this._searchBarService.getUserByUserData(data)
          .subscribe({
          
          next: (userData) => {

            this._usersComponent.getUsers(userData)

          },
          error: (error) => console.log(error)
        })
        }
        else{ 
          this._usersComponent.getUsers() // Calls Default User Display
        }
      },
      error: (error) => console.log(error)
    })
  }
  
}
