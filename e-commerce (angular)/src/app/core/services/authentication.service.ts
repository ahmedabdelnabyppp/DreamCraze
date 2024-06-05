import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, Observable, catchError, delay, finalize, throwError } from "rxjs";
import * as jwt_decode from "jwt-decode";


@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly TOKEN_KEY = 'ui&*s';
    public tokenSubject: BehaviorSubject<string | null>;
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loadingRegsiter$ = this.loadingSubject.asObservable();
    private readonly USER_INFO_KEY = 'userInfo';

    constructor(private _http: HttpClient, private cookieService: CookieService) {
        this.tokenSubject = new BehaviorSubject<string | null>(this.getTokenFromCookie());
    }

    authentication(AuthRequest: any): Observable<any> {
        return this._http.post("http://localhost:8090/api/v1/auth/authentication", AuthRequest);
    }

    register(registerRequest: any): Observable<any> {
        this.loadingSubject.next(true);
        return this._http.post("http://localhost:8090/api/v1/auth/register", registerRequest)
            .pipe(
                catchError(error => {
                    return throwError(error);
                }),
                finalize(() => this.loadingSubject.next(false))
            );
    }

    verifycationEmail(otp: string): Observable<any> {
        const otpObject = { "otp": otp };
        return this._http.post("http://localhost:8090/api/v1/auth/verificationOtp", otpObject);
    }

    private extractExpirationDateFromToken(token: string): Date | null {
        try {
            const decodedToken: any = jwt_decode.jwtDecode(token);
            if (decodedToken && decodedToken.exp) {
                const expirationTimeInSeconds = decodedToken.exp;
                return new Date(expirationTimeInSeconds * 1000);
            }
        } catch (error) {
            console.error('Error decoding token:', error);
        }
        return null;
    }

    private setTokenCookie(token: string): void {
        const expirationDate = this.extractExpirationDateFromToken(token);
        if (expirationDate) {
            this.cookieService.set(this.TOKEN_KEY, token, expirationDate);
            this.tokenSubject.next(token);
        }
    }

    getTokenFromCookie(): string | null {
        return this.cookieService.get(this.TOKEN_KEY);
    }


    setToken(token: string): void {
        this.setTokenCookie(token);
        this.tokenSubject.next(token);
    }

    getToken(): Observable<string | null> {
        return this.tokenSubject.asObservable();
    }

    private extractUserInfoFromToken(token: string): { userId: number, email: string, role: string } | null {
        try {
            const decodedToken: any = jwt_decode.jwtDecode(token);
            console.log(decodedToken)
            if (decodedToken && decodedToken.userId && decodedToken.sub && decodedToken.role) { return { userId: decodedToken.userId, email: decodedToken.sub, role: decodedToken.role }; }
        }
        catch (error) { console.error('Error decoding token:', error); }
        return null;
    }


    public setUserInfoInSessionStorage(token: string): void {
        const userInfo = this.extractUserInfoFromToken(token);
        if (userInfo) {
            sessionStorage.setItem(this.USER_INFO_KEY, JSON.stringify(userInfo));
        }
    }

    public getUserInfoFromSessionStorage(): { userId: number, email: string, role: string } | null {
        if (typeof sessionStorage !== 'undefined') {
            const userInfoString = sessionStorage.getItem(this.USER_INFO_KEY);
            if (userInfoString) {
                return JSON.parse(userInfoString);
            }
        }
        return null;
    }

    logout(): void {
        sessionStorage.removeItem(this.USER_INFO_KEY);
        this.cookieService.delete(this.TOKEN_KEY);
        this.tokenSubject.next(null);
    }
}
