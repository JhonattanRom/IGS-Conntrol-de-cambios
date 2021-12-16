import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from "../Service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class IdUsuarioGuard implements CanActivateChild {
 
  constructor(private authService : AuthService,
	            private router: Router ){}	
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.LoggedIn()) {
    	 console.log("Hola id");
    	 return true;
    }
    console.log("Hola id!!!");
    this.router.navigate(['./']);
    return false;
  }
  
}
