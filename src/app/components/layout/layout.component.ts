import { Component } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { CharacterFilterComponent } from '../character-filter/character-filter.component';
import { CharacterListComponent } from '../character-list/character-list.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CharacterListComponent, CharacterFilterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  allCharacters: any[] = [];
  filteredCharacters: any[] = [];

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.characterService.getAllCharacters().subscribe(data => {
      this.allCharacters = data;
      this.filteredCharacters = [...data];
    });
  }

  onFilterChanged(filters: any): void {
    this.filteredCharacters = this.allCharacters.filter((char: any) => {
      const matchMovie = !filters.movie || char.films.includes(filters.movie);
      const matchSpecies = !filters.species || char.species.includes(filters.species);
      const matchBirthYear = this.birthYearInRange(char.birth_year, filters.birthYearFrom, filters.birthYearTo);
      return matchMovie && matchSpecies && matchBirthYear;
    });
  }

  birthYearToNumber(birthYear: string): number | null {
    if (!birthYear) return null;
    const num = parseFloat(birthYear.replace(/[^\d.]/g, ''));
    return birthYear.includes('BBY') ? -num : birthYear.includes('ABY') ? num : null;
  }

  birthYearInRange(birthYear: string, from: string, to: string): boolean {
    const year = this.birthYearToNumber(birthYear);
    const fromYear = this.birthYearToNumber(from);
    const toYear = this.birthYearToNumber(to);

    if (year === null) return false;
    if (from && fromYear !== null && year < fromYear) return false;
    if (to && toYear !== null && year > toYear) return false;

    return true;
  }

}
