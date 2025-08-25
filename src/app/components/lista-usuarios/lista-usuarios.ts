import { Component, OnInit, ViewChild, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatCard } from '@angular/material/card';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  idade?: number;
}

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCard
],
  templateUrl: './lista-usuarios.html',
  styleUrls: ['./lista-usuarios.css']
})
export class ListaUsuariosComponent implements OnInit {
  private readonly API = 'http://localhost:3000/usuarios';

  usuarios = signal<Usuario[]>([]);
  filtro = signal<string>('');

  displayedColumns: string[] = ['nome', 'email', 'idade', 'acoes'];
  dataSource = new MatTableDataSource<Usuario>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private router: Router) {
  // sempre que "usuarios" mudar, atualiza o db.json
    effect(() => {
      this.dataSource.data = this.usuariosFiltrados();
    });
  }
  // Carregar usuários na injeção
  ngOnInit() {
    this.carregarUsuarios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  carregarUsuarios() {
    this.http.get<Usuario[]>(this.API).subscribe({
      next: data => this.usuarios.set(data),
      error: () => this.usuarios.set([])
    });
  }

  // Função para excluir o usuário
  deletarUsuario(id: String) {
    this.http.delete(`${this.API}/${id}`).subscribe(() => this.carregarUsuarios());
  }

  // Funções para definir as rotas de navegação
  editarUsuario(id: String) {
    this.router.navigate(['/editar', id]);
  }
  adicionarUsuario() {
    this.router.navigate(['/adicionar']);
  }
  menuInicial() {
    this.router.navigate(['/home']);
  }
  
  // Função para filtrar os usuários
  usuariosFiltrados = computed(() => {
    const f = this.filtro().trim().toLowerCase();
    if (!f) return this.usuarios();
    return this.usuarios().filter(u =>
      u.nome.toLowerCase().includes(f) || u.email.toLowerCase().includes(f)
    );
  });

  // Função extra de exportação de dados
  exportarPDF() {
    const doc = new jsPDF();
    doc.text('Relatório de Usuários', 14, 10);
    autoTable(doc, {
      startY: 20,
      head: [[ 'Nome', 'Email', 'Idade']],
      body: this.usuariosFiltrados().map(u => [
        u.nome,
        u.email,
        u.idade ?? ''
      ]),
    });
    doc.save('Usuarios cadastrados.pdf');
  }
}
