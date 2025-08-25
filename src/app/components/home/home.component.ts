import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    RouterModule,
    CommonModule
  ]
})
export class HomeComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);

  // Objetivo do trecho é identificar o uso de desktop ou smartphone
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  // Criação de um menu com as suas rotas pré estabelecidas
  itensMenu = [
    { label: 'Listar Usuários', icon: 'list', route: '/usuarios' },
    { label: 'Adicionar Usuário', icon: 'person_add', route: '/adicionar' }
  ];

}
