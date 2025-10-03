import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export function clientIdInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) : Observable<HttpEvent<unknown>> {
    const cloned = req.clone({ setHeaders: { 'X-Client-Id': 'pictet-solutions' } });
    return next(cloned);
}