import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private apiUrl = 'mock-characters.json';

  constructor(private http: HttpClient) { }

  getAllCharacters(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getCharacterById(id: number): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(characters => characters.find(c => c.id === id))
    );
  }

}
