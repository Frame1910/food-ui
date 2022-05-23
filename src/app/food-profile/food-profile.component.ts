import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Food } from '../service/api.service';

@Component({
  selector: 'app-food-profile',
  templateUrl: './food-profile.component.html',
  styleUrls: ['./food-profile.component.scss']
})
export class FoodProfileComponent implements OnInit, OnChanges {
  @Input() food: Food | undefined;
  parsed: any;

  constructor() { }

  ngOnInit(): void {
    this.update();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update() {
    if (this.food) {
      this.parsed = Object.entries(this.food);
      console.log(this.parsed);
    }
  }

}
