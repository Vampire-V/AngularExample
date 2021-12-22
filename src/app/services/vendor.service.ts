import { Vendor } from '../models/Vendor';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';
import { Meta } from '../models/Meta';
import { Links } from '../models/Links';
import { Config } from '../models/Config';
export interface VendorData {
  items: Vendor[];
  meta: Meta;
  links: Links;
}
@Injectable({
  providedIn: 'root',
})
export class VendorService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    // Authorization: 'my-auth-token'
  };
  private apiURL = 'https://localhost:2003/api/Vendor'; // URL to web api
  constructor(private http: HttpClient) {}

  // HttpClient API get() method => Fetch vendors list
  getVendors(
    filter = '',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 3
  ): Observable<Config> {
    return this.http.get<Config>(this.apiURL, {
      params: new HttpParams()
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString()),
    }).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Config>('fetch vendors...'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      console.log(`${operation} failed: ${error.message}`);
      

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
  }
}
