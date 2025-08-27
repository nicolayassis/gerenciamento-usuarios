import { Routes } from '@angular/router';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios';
import { AdicionarUsuariosComponent } from './components/adicionar-usuarios/adicionar-usuarios';
import { HomeComponent } from './components/home/home.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'usuarios', component: ListaUsuariosComponent },
  { path: 'adicionar', component: AdicionarUsuariosComponent },
  { path: 'editar/:id', component: AdicionarUsuariosComponent },
];
