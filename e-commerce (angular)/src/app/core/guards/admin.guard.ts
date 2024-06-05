
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/authentication.service';
@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(): boolean {
        const userInfo = this.authService.getUserInfoFromSessionStorage();
        if (userInfo && userInfo.role === 'ADMIN') {
            return true;
        } else {
            this.router.navigate(['/singin']);
            return false;
        }
    }
}