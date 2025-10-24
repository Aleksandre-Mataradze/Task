import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class PostsService {

    private http = inject(HttpClient);

    GetPosts(): Observable<any> { // Get Posts Full List of Data
        return this.http.get('https://jsonplaceholder.typicode.com/posts')
    }

    getPostById(postId: number): Observable<any>{ // Get Single Post Data
        return this.http.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    }
}