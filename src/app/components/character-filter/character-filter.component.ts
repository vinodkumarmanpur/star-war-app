import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './character-filter.component.html',
  styleUrl: './character-filter.component.scss'
})
export class CharacterFilterComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<any>();

  filters = {
    movie: '',
    species: '',
    birthYearFrom: '',
    birthYearTo: ''
  };

  movies: any[] = []
  speciesList: any[] = [];

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    forkJoin({
      movies: this.characterService.getAllMovies(),
      species: this.characterService.getAllSpecies()
    }).subscribe({
      next: res => {
        this.movies = res.movies;
        this.speciesList = res.species;
      }
    })

  }

  applyFilters() {
    this.filterChanged.emit({ ...this.filters });
  }

}
