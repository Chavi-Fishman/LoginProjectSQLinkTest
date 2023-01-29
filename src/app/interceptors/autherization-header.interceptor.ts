
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthServiceService } from 'app/services/auth-service.service';

@Injectable()
export class AutherizationHeaderInterceptor implements HttpInterceptor {

    constructor(private authService: AuthServiceService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.isLoggedOn) {
            // Clone the request to add the new header
            const clonedRequest = req.clone({ headers: req.headers.append('Authorization', `Bearer ${this.authService.token}`) });

            // Pass the cloned request instead of the original request to the next handle
            return next.handle(clonedRequest);
        } else {
            return next.handle(req)
        }
    }
}