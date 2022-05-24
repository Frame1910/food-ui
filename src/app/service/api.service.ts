import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface RedisDocument {
  id: string,
  value: FoodSearch,
}
export interface RedisResponse {
  total: number,
  documents: Array<RedisDocument>,
}
export interface FoodSearch {
  food_name: string,
  food_desc: string,
  class_name: string,
  entry_type: string,
  public_food_key: string,
}

export interface Food {
  public_food_key: string,
  food_profile_id: string,
  derivation: string,
  food_name: string,
  food_description: string,
  sampling_details: string,
  nitrogen_factor: string,
  fat_factor: string,
  specific_gravity: string,
  analysed_portion: string,
  unanalysed_portion: string,
  classification: string,
  classification_name: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:8080'

  constructor(
    private http: HttpClient,
  ) { }

  queryFoods(term: string): Observable<RedisResponse> {
    return this.http.get<RedisResponse>(`${this.baseUrl}/search?term=${encodeURIComponent(term)}`);
  }

  getFood(index: string): Observable<Food> {
    return this.http.get<Food>(`${this.baseUrl}/${index}`);
  }


}
