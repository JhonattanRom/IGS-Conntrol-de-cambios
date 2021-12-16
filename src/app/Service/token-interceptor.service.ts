import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpHeaders  } from '@angular/common/http';
import { AuthService } from "../Service/auth.service";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {
  
  constructor(private injector: Injector) {}

  intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >>{
  	//let authService = this.injector.get(AuthService);

  	let token = localStorage.getItem("token"); 
    //console.log(req, "Este es el objeto REQUEST");
    //console.log(next, "Este es el NEXT");
  	//debugger;
  	const Tokenizedreq = req.clone({
  	 	setHeaders: {
  	 		Authorization: `Bearer ${token}`
  	 	}
  	})
  	return next.handle(Tokenizedreq);
  }

}




/*import { Injectable} from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { AuthService } from "../Service/auth.service";
import { Observable } from "rxjs";
import 'rxjs/add/operator/mergeMap';
@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {
  
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any> , next: HttpHandler): Observable < HttpEvent <any>>{
    return this.authService.getToken()
                .mergeMap(() => {
            
           request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${this.authService.getToken()}`
                    }
                });
            
            return next.handle(request);
        });
    //let authService = this.injector.get(AuthService);
/*
    let token = await localStorage.getItem("token"); 
    await console.log(token, "Este deberia ser e token");
    //debugger;
    const Tokenizedreq = await req.clone({
       setHeaders: {
         Authorization: `Bearer ${token}`
       }
    })
    return next.handle(Tokenizedreq);
  }
*/
 /* console.log('Hello request!', request);
        return next.handle(request);*/
//}
//}


/*
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {

    const contentHeaders = new HttpHeaders();
    contentHeaders.append('Accept', 'application/json');
    contentHeaders.append('Content-Type', 'application/json');

    const servicio = this.injector.get(AuthService);
    const tokenReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authoriztion: `Bearer ${servicio.getToken()}`
      }
    });
    return next.handle(tokenReq)
  }
}*/



/*
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {

    const contentHeaders = new HttpHeaders();
    contentHeaders.append('Accept', 'application/json');
    contentHeaders.append('Content-Type', 'application/json');

    const servicio = this.injector.get(AuthService);
    const tokenReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authoriztion: `Bearer ${servicio.getToken()}`
      }
    });
    return next.handle(tokenReq)
  }
}*/