import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanActivate, CanActivateChild} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
// export class AuthGuard implements CanActivate {
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//     return true;
//   }
// }

// @Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private auth: AuthService, private router: Router) {}
    canActivate(
        next:  ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (this.auth.isAuthenticated(['administrador','editor','visor']) ) { return true; }
        console.log('Navegación no autenticada para iniciar sesión');
        this.router.navigateByUrl('/');
        return false;
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
}
@Injectable()
export class AuthGuardAd implements CanActivate, CanActivateChild {
    constructor(private auth: AuthService, private router: Router) {}
    canActivate(
        next:  ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (this.auth.isAuthenticated(['administrador'])) { return true; }
        console.log('Navegación no autenticada para iniciar sesión');
        this.router.navigateByUrl('/');
        return false;
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
}
@Injectable()
export class AuthGuardEt implements CanActivate, CanActivateChild {
    constructor(private auth: AuthService, private router: Router) {}
    canActivate(
        next:  ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (this.auth.isAuthenticated(['editor'])) { return true; }
        console.log('Navegación no autenticada para iniciar sesión');
        this.router.navigateByUrl('/');
        return false;
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
}
@Injectable()
export class AuthGuardVi implements CanActivate, CanActivateChild {
    constructor(private auth: AuthService, private router: Router) {}
    canActivate(
        next:  ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (this.auth.isAuthenticated(['visor'])) { return true; }
        console.log('Navegación no autenticada para iniciar sesión');
        this.router.navigateByUrl('/');
        return false;
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
}

@Injectable()
export class AuthApiWeb implements CanActivate, CanActivateChild {
    constructor(private auth: AuthService, private router: Router) {}
    canActivate(
        next:  ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (this.auth.isAuthenticated(['apiweb'])) { return true; }
        console.log('Navegación no autenticada para iniciar sesión');
        this.router.navigateByUrl('/eventos');
        return false;
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
}