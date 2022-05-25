import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food, FoodSearch, Nutrient, RedisResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:8080'

  constructor(
    private http: HttpClient,
  ) { }

  queryFoods(term: string): Observable<RedisResponse<FoodSearch>> {
    return this.http.get<RedisResponse<FoodSearch>>(`${this.baseUrl}/search?term=${encodeURIComponent(term)}`);
  }

  getFood(index: string): Observable<Food> {
    return this.http.get<Food>(`${this.baseUrl}/${index}`);
  }

  getNutrient(food_key: string): Observable<RedisResponse<Nutrient>> {
    return this.http.get<RedisResponse<Nutrient>>(`${this.baseUrl}/nutrient/${food_key}`)
  }

}
