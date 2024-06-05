import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/authentication.service';
@Injectable({
    providedIn: 'root'
})
export class UserGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        const userInfo = this.authService.getUserInfoFromSessionStorage();
        if (userInfo && userInfo.role === 'USER') {
            return true;
        } 
        else if(this.authService.getTokenFromCookie()=='' ||this.authService.getTokenFromCookie()==null ){
           return true;
        }
        else {
            this.router.navigate(['/dashboard']);
            return false;
        }
    }
}