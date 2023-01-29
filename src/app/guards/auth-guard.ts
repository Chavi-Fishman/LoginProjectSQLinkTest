import { Injectable, NgZone } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthServiceService } from 'app/services/auth-service.service';

@Injectable(
    {providedIn:'root'}
)
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthServiceService, private ngZone: NgZone) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isLoggedOn) {
            return true;
        }

        this.ngZone.run(() => this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } }));
        return false;
    }
}
