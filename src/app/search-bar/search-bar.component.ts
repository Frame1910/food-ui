import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, map, Observable } from 'rxjs';
import { ApiService } from '../service/api.service';
import packageJson from '../../../package.json';
import { RedisResponse, FoodSearch, RedisDocument } from '../models';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() hideOnBlur = new EventEmitter<boolean>();
  version = packageJson.version;

  searchInput = new FormControl('');

  searchResults: RedisResponse<FoodSearch> | undefined;

  @ViewChild('searchBar') searchBarRef: ElementRef | undefined;
  @ViewChild('inputElement') input: ElementRef | undefined;

  resultsBlurred: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.HandsetPortrait)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private apiService: ApiService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.searchInput.valueChanges.pipe(
      debounceTime(300),
    ).subscribe(term => {
      this.apiService.queryFoods(term).subscribe(results => {
        this.searchResults = results;
      })
    });
  }

  route(data: RedisDocument<FoodSearch>) {
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
      if (this.isHandset$) {
        this.hideOnBlur.emit(this.resultsBlurred);
      }
    }
  }

}
