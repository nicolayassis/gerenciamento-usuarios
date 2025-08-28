// Importa recursos principais do Angular
import { Component, inject } from '@angular/core';
// Responsável por observar breakpoints (largura da tela) e identificar se é mobile/desktop
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
// Módulos do Angular Material usados no componente
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

// Bibliotecas do Angular
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',                   // Nome da tag HTML para usar este componente
  standalone: true,                      // Define o componente como independente (não precisa de módulo)
  templateUrl: './home.component.html', // Arquivo HTML associado
  styleUrls: ['./home.component.css'], // Estilos CSS específicos do componente
  imports: [                          // Módulos que serão utilizados no template
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterOutlet,
    RouterModule,
    CommonModule
  ]
})
export class HomeComponent {
  // Injeta o BreakpointObserver para observar se a tela é mobile ou desktop
  private breakpointObserver = inject(BreakpointObserver);
  // Injeta o Router para navegação entre rotas
  private router = inject(Router);

  // Observable que emite true/false se a tela for classificada como "handset" (mobile)
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)     // Observa se o breakpoint de "handset" (mobile) é atingido
    .pipe(
      map(result => result.matches),  // Converte o resultado para boolean (true se for mobile)
      shareReplay()                   // Reaproveita o último valor emitido (melhora performance)
    );

  // Lista de itens do menu (label = nome, icon = ícone material, route = rota do sistema)
  itensMenu = [
    { label: 'Listar Usuários', icon: 'list', route: '/usuarios' },
    { label: 'Adicionar Usuário', icon: 'person_add', route: '/adicionar' }
  ];
}
