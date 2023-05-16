import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GetRequestOptions {
  cache?: boolean;
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  responseType?: any;
  reportProgress?: boolean;
  withCredentials?: boolean;
}

export interface PostRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  responseType?: 'json';
  reportProgress?: boolean;
  withCredentials?: boolean;
}

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }

  get<R>(
    url: string,
    requestType: string,
    { ...options }: GetRequestOptions = {}
  ): Observable<R> {
    const headers = options.headers || new HttpHeaders();

    return this.http.get(`${url}`, {
      ...options,
      headers: headers.set('Accept', requestType)
    }) as Observable<R>;
  }

  post(
    url: string,
    requestType?: string,
    body: FormData | any | null = {},
    options: PostRequestOptions = {}
  ): Observable<any> {
    let headers = options.headers || new HttpHeaders();
    headers = headers.set('Accept', '*/*');

    if (requestType) {
      headers = headers.set('Content-Type', requestType);
    }
    return this.http.post(`${url}`, body, {
      ...options,
      headers,
      observe: 'body',
      responseType: 'json'
    });
  }
}
