import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface RedisDocument<Type> {
  id: string,
  value: Type,
}
export interface RedisResponse<Type> {
  total: number,
  documents: Array<RedisDocument<Type>>,
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

export interface Nutrient {
  public_food_key: string,
  classification: string,
  food_name: string,
  energy_with_dietary_fibre_equated_kj: string,
  energy_without_dietary_fibre_equated_kj: string,
  moisture_water_g: string,
  protein_g: string,
  nitrogen_g: string,
  fat_total_g: string,
  ash_g: string,
  total_dietary_fibre_g: string,
  alcohol_g: string,
  fructose_g: string,
  glucose_g: string,
  sucroseg: string,
  maltose_g: string,
  lactose_g: string,
  galactose_g: string,
  maltotrios_g: string,
  total_sugars_g: string,
  added_sugars_g: string,
  free_sugars_g: string,
  starch_g: string
}

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
