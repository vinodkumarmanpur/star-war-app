import { Routes } from '@angular/router';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
    { path: '', component: LayoutComponent},
    { path: 'character/:id', component: CharacterDetailComponent },
];
