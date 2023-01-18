import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(() => error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${APP_CONFIG.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${APP_CONFIG.api_url}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  post(
    path: string,
    body: Object = {},
    params = new HttpParams()
  ): Observable<any> {
    return this.http
      .post(`${APP_CONFIG.api_url}${path}`, body, {
        params,
      })
      .pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http
      .delete(`${APP_CONFIG.api_url}${path}`)
      .pipe(catchError(this.formatErrors));
  }
}
