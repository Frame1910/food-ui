import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface RedisDocument {
  id: string,
  value: Food,
}
export interface RedisResponse {
  total: number,
  documents: Array<RedisDocument>,
}
export interface Food {
  food_name: string,
  food_desc: string,
  class_name: string,
  entry_type: string,
  public_food_key: string,
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:8080'

  constructor(
    private http: HttpClient,
  ) { }

  queryRedis(term: string): Observable<RedisResponse> {
    return this.http.get<RedisResponse>(`${this.baseUrl}/search?term=${encodeURIComponent(term)}`);
  }
}
