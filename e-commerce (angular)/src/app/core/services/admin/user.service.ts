import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private _http: HttpClient) { }
    private baseUrl = 'http://localhost:8090/api/users';
    getAllUsers(): Observable<any> {
        return this._http.get<any>(`${this.baseUrl}/allUsers`)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.error instanceof ErrorEvent) {
                        console.error('An error occurred:', error.error.message);
                    } else {
                        console.error(
                            `Backend returned code ${error.status}, ` +
                            `body was: ${error.error}`);
                    }
                    return throwError('Something bad happened; please try again later.');
                })
            );
    }

}
