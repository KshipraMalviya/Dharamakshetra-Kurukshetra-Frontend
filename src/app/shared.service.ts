import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DestinationResponse } from './responseInterface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "http://127.0.0.1:8000/";

  constructor(private http: HttpClient) { }

  getAllDestinations(): Observable<DestinationResponse> {
    return this.http.get<DestinationResponse>(this.APIUrl);
  }

  getRecommendations(val: any) {
    return this.http.post(this.APIUrl + "recommendations/", val);
  }
}
