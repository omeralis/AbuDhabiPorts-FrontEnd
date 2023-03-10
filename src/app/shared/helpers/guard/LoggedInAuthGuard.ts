import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/layouts/authentication/services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class LoggedInAuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.getIsLoggedIn().value) {
      this.router.navigate(['employees']);
    }
    return true;
  }
}
