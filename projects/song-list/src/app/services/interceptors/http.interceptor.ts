import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../../../../host/src/app/services/auth.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService)
    // const authToken = authService.getAuthToken()
    const requestWithAuthorization = req.clone({
        // headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });

    return next(requestWithAuthorization)
};

