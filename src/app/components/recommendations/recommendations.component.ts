import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SharedService } from '../../shared.service';
import { SuggestionService } from '../../suggestion.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RecommendationsComponent {

  BackBtn: string;
  Search: string;
  searchTerm = '';
  suggestions$: Observable<string[]> | null = null;
  Recommendations: any[] = [];
  selectedIndex: number = -1;

  constructor(private service:SharedService, private suggestion: SuggestionService) {
    this.BackBtn = '/assets/images/backBtn.png';
    this.Search = '/assets/images/searchicon.jpg';
    this.suggestions$ = null;
  }

  onSearch() {
    console.log('Performing search for:', this.searchTerm);
    this.suggestions$ = null;
    let val = {destination: this.searchTerm};
    this.service.getRecommendations(val).subscribe((res: any) => {
      this.Recommendations = res as any[];
    });
  }

  updateSuggestions() {
    this.suggestions$ = this.suggestion.getSuggestions(this.searchTerm);
    if (this.searchTerm == '') {
      this.suggestions$ = null;
    }
  }

  selectSuggestion(suggestion: string) {
    this.searchTerm = suggestion;
    this.suggestions$ = null;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.suggestions$) {
      this.suggestions$.subscribe((suggestions) => {
        if (suggestions && suggestions.length > 0) {
          if (event.key === 'ArrowUp') {
            this.navigateList(-1);
          } else if (event.key === 'ArrowDown') {
            this.navigateList(1);
          } else if (event.key === 'Enter') {
            this.handleEnterKey();
          }
        }
      });
    }
  }

  navigateList(direction: number) {
    if (this.suggestions$) {
      this.suggestions$.subscribe((suggestions) => {
        const newIndex = this.selectedIndex + direction;
        if (newIndex >= 0 && newIndex < suggestions.length) {
          this.selectedIndex = newIndex;
        }
      });
    }
  }

  handleEnterKey() {
    if (this.suggestions$) {
      this.suggestions$.subscribe((suggestions) => {
        if (this.selectedIndex >= 0 && this.selectedIndex < suggestions.length) {
          this.searchTerm = suggestions[this.selectedIndex];
          this.suggestions$ = null;
          this.onSearch();
        }
      });
    }
  }
}