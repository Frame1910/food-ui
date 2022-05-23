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
  public_food_key?: string,
  food_profile_id?: string,
  derivation?: string,
  sampling_details?: string,
  nitrogen_factor?: string,
  fat_factor?: string,
  specific_gravity?: string,
  analysed_portion?: string,
  unanalysed_portion?: string,
  classification?: string,
  classification_name?: string
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
    return this.http.get<RedisResponse>(`${this.baseUrl}/search?term=${term}`);
  }
}
