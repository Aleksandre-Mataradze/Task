import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class TodoService {

    private _http = inject(HttpClient)

    getTodoByUserId(userId: number): Observable<any[]>{

        return this._http.get<any[]>('https://jsonplaceholder.typicode.com/todos')
        .pipe(
            map(todos => todos.filter(todo => todo.userId === userId))
        );
    }
}