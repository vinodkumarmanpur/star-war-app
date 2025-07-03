import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './character-filter.component.html',
  styleUrl: './character-filter.component.scss'
})
export class CharacterFilterComponent {
  @Output() filterChanged = new EventEmitter<any>();

  filters = {
    movie: '',
    species: '',
    birthYearFrom: '',
    birthYearTo: ''
  };

  movies = [
    "Episode I",
    "Episode II",
    "Episode III",
    "Episode IV",
    "Episode V",
    "Episode VI",
    "Episode VII",
    "Episode VIII",
    "Episode IX"
  ]

  speciesList = [
    "Human",
    "Yoda's species",
    "Wookiee",
    "Droid"
  ];

  applyFilters() {
    this.filterChanged.emit({ ...this.filters });
  }

}
