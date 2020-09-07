import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, empty, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  //baseURL for the api calls
  baseURL = 'http://api.tvmaze.com';

  dramaShows = {};
  actionShows = {};
  romanceShows = {};
  sciFiShows = {};
  horrorShows = {};

  constructor(private http: HttpClient) { }

  // Fetches all avaiable shows data.
  getAllShows(): Observable<{}>{
    return this.http.get(`${this.baseURL}/shows`);
  }

  // Fetches show data by id.
  getShowById(id: number): Observable<{}>{
    return this.http.get(`${this.baseURL}/shows/${id}`);
  }

  // Fetches season list for given show.
  getShowSeasonList(id: number): Observable<[]>{
    return this.http.get(`${this.baseURL}/shows/${id}/seasons`)
    .pipe(map((data: any) => data));
  }

  // Searches data based on search string.
  search(term: string): Observable<[]> {
    if(!term){
      return of(null);
    }
    return this.http.get(`${this.baseURL}/search/shows?q=${term}`)
    .pipe(map((data: any) => data));
  }  
}
