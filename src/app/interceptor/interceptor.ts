import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable'

@Injectable()
export class Interceptor implements HttpInterceptor {

  public static url = 'https://api.lockerroomapp.com';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let event: HttpRequest<any>;
    const data = localStorage.getItem('sessionToken');
    if (data) {
      const json = JSON.parse(data);
      const token = json['token'];

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

  public static transformUrl(url: string) {
    const data = localStorage.getItem('sessionToken');
    if (data) {
      const json = JSON.parse(data);
      const token = json['token'];
      return Interceptor.url + url + `?token=${token}`;
    }
    return Interceptor.url + url;
  }
}
