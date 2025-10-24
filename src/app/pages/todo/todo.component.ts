import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { CommonModule} from "@angular/common";

@Component({
  selector: 'app-todo',
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit{

  todos = signal<any[]>([])

  private _activeRoute = inject(ActivatedRoute)
  private _todoService = inject(TodoService)

  ngOnInit(): void {

    
    this.getUserTodoList()
    
    console.log(this.getUserId())
  }

  getUserId(): number{

    return Number(this._activeRoute.snapshot.paramMap.get('userId'));
  }

  getUserTodoList(): void {

    this._todoService.getTodoByUserId(this.getUserId())
    .subscribe({
      next: (data) => {
        
        console.log(data)
        this.todos.set(data)
      },
      error: (error) => console.log(error)
    })
  }

  trackByID(todo: any): number {
    return todo.id
  }
}
