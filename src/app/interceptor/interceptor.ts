import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class Interceptor implements HttpInterceptor {

    public static url = "http://192.168.1.8:8187"; // "https://api.lockerroomapp.com";

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let event: HttpRequest<any>;
        let data = localStorage.getItem('sessionToken');
        if (data) {
            let json = JSON.parse(data);
            let token = json['token'];

            event = req.clone({
                url: Interceptor.url + req.url,
                setHeaders: {
                    'token': `${token}`
                }
            });
        } else {
            event = req.clone({
                url: Interceptor.url + req.url
            });
        }

        return next.handle(event);
    }
}