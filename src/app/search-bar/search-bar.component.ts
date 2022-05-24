import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('searchBar') searchBarRef: ElementRef | undefined;
  @ViewChild('inputElement') input: ElementRef | undefined;

  resultsBlurred: boolean = false;

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

  hasHighlights(field: string): boolean {
    return field.includes('<b>')
  }

  get isResultsShowing() {
    return (this.searchResults && this.searchResults.documents.length > 0) && !this.resultsBlurred
  }

  focusHandler(event: FocusEvent) {
    this.resultsBlurred = false;
  }

  blurHandler(event: FocusEvent | string) {
    if (typeof event == 'string') {
      this.resultsBlurred = true;
      this.input!.nativeElement.blur()
    }
    else if (this.searchBarRef && !this.searchBarRef.nativeElement.contains(event.relatedTarget)) {
      this.resultsBlurred = true;
    }
  }

}
