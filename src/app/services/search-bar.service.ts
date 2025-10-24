import { inject, Injectable } from "@angular/core";
import { UsersService } from "./users.service";
import { filter, map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class SearchBarService {

    private _userService = inject(UsersService)

    getUserByUserData(data: string): Observable<any[]> { // Filter Users By Search Input

        return this._userService.getUsers()
        .pipe(
            map(users => users.filter((u: { name: string; email: string; }) => { // Filters data & returns just unique users that matches Search Bar Input
                const splittedName = u.name.toLowerCase()
                const splittedEmail = u.email.toLowerCase()
                const search = data.toLowerCase()

                return splittedName.includes(search) || splittedEmail.includes(search) // Returns the user, regardless of whether they are searched by name or email
            }))
        )
    }
}