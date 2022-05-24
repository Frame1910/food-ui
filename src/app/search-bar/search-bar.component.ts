import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { ApiService, RedisDocument, RedisResponse } from '../service/api.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchInput = new FormControl('');

  searchResults: RedisResponse | undefined;

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.searchInput.valueChanges.pipe(
      debounceTime(300),
    ).subscribe(term => {
      this.apiService.queryRedis(term).subscribe(results => {
        this.searchResults = results;
      })
    });
  }

  route(data: RedisDocument) {
    console.log(data)
  }

}
