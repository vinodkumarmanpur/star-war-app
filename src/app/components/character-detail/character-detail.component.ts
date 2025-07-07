import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss'
})
export class CharacterDetailComponent {
  character: any;
  speciesNames: string[] = [];
  filmTitles: string[] = [];
  starshipNames: string[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private characterService: CharacterService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.characterService.getCharacterById(id).subscribe({
        next: data => {
          this.character = data;

          // Fetch species names
          if (data.species) {
            data.species.forEach((url: string) => {
              this.http.get<any>(url).subscribe(species => {
                this.speciesNames.push(species.name);
              });
            });
          }

          // Fetch film titles
          if (data.films) {
            data.films.forEach((url: string) => {
              this.http.get<any>(url).subscribe(film => {
                this.filmTitles.push(film.title); // or film.name if needed
              });
            });
          }

          // Fetch starship names
          if (data.starships) {
            data.starships.forEach((url: string) => {
              this.http.get<any>(url).subscribe(starship => {
                this.starshipNames.push(starship.name);
              });
            });
          }

        }
      })
    }
  }

}
