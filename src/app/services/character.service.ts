import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private apiUrl = "https://swapi.info/api";

  constructor(private http: HttpClient) { }

  getAllCharacters(): Observable<any> {
    return this.http.get(this.apiUrl + `/people`);
  }

  getCharacterById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl + `/people`}/${id}`);
  }

  getAllMovies(): Observable<any> {
    return this.http.get(this.apiUrl + `/films`);
  }

  getAllSpecies(): Observable<any> {
    return this.http.get(this.apiUrl + `/species`);
  }

}
