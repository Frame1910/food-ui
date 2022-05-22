import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ApiService, Food } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'redisTest';

  term = new FormControl('');
  results: Array<Food> = [];
  isLoading: boolean = false;

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.term.valueChanges.pipe(
      debounceTime(400),
    ).subscribe(term => {
      if (term.length == 0) {
        this.results = [];
      }
      this.isLoading = true
      this.api.queryRedis(term).subscribe(results => {
        this.results = results
        this.isLoading = false;
      });
    })
  }
}
