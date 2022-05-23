import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ApiService, Food, RedisDocument } from '../service/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  term = new FormControl('');
  results: Array<RedisDocument> = [];
  totalResults: number = 0;
  isLoading: boolean = false;

  activeProfile: Food | undefined;

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.term.valueChanges.pipe(
      debounceTime(0),
    ).subscribe(term => {
      if (term.length == 0) {
        this.results = [];
        this.activeProfile = undefined
      }
      this.isLoading = true
      this.api.queryRedis(term).subscribe(results => {
        this.results = results.documents
        this.totalResults = results.total
        this.isLoading = false;
      });
    })
  }

}
