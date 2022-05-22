import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  queryRedis(term: string): Observable<Array<Food>> {
    return this.http.get<Array<Food>>(`${this.baseUrl}/search?term=${term}`);
  }
}
