import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../../authentication.service";

@Injectable({ providedIn: "root" })
export class HeaderInterceptor implements HttpInterceptor {
    constructor(private _authService:AuthService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const TOKEN = this._authService.getTokenFromCookie();
        if (TOKEN !== null && TOKEN !== '') {
            const modifiedRequest = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${TOKEN}`
                }
            });
            return next.handle(modifiedRequest);
        }
        return next.handle(req);   
    }
}
