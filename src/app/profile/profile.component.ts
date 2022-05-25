import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Food, Nutrient } from '../models';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  food: Food | undefined;
  nutrient: Nutrient | undefined;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.HandsetPortrait)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.apiService.getFood(param['food_key']).subscribe(food => {
        this.food = food
        this.apiService.getNutrient(this.food.public_food_key).subscribe(nutrient => this.nutrient = nutrient.documents[0].value);
      });
    })
  }

}
