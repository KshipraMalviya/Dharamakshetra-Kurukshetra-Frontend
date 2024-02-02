import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { SharedService } from './shared.service';
import { DestinationResponse } from './responseInterface';

@Injectable({
  providedIn: 'root',
})
export class SuggestionService {
  private suggestions: string[] | null = null;

  constructor(private shared: SharedService) {
    this.loadSuggestions();
  }

  private loadSuggestions() {
    this.shared.getAllDestinations().pipe(
      tap((data: DestinationResponse) => {
        this.suggestions = Object.values(data.destinations);
      })
    ).subscribe();
  }

  getSuggestions(inputText: string): Observable<string[]> {
    const filteredSuggestions = (this.suggestions ?? []).filter((suggestion) =>
      suggestion.toLowerCase().includes(inputText.toLowerCase())
    );
    return of(filteredSuggestions);
  }
}
