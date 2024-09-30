import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment }  from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiconfigService {
  urlBase= environment.api_url;


  constructor(private httpClient: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders( {
      'apiKey':environment.apiKey,
      'Authorization' : 'Bearer Chao' + environment.apiKey
    })
    
  }
  private handlerError(error: HttpErrorResponse){
    console.error('Error', error);
    return throwError(()=> error);
  }
  
  get <T>(path: string, params?:HttpParams): Observable<HttpResponse<T>>{
    return this.httpClient.get<T>(this.urlBase+path,
    {
      headers: this.getHeaders(),
      observe: 'response',
      params
    })
    .pipe(
      catchError(this.handlerError)
    )
  }
}

