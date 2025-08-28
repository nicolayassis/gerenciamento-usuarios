import { Component, OnInit, ViewChild, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCard } from '@angular/material/card';

// Biblioteca para exportar PDF
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Interface que define a estrutura de um usuário
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
    MatCard,
    MatTooltipModule,
  ],
  templateUrl: './lista-usuarios.html',
  styleUrls: ['./lista-usuarios.css']
})
export class ListaUsuariosComponent implements OnInit {
  // URL base da API (json-server neste caso)
  private readonly API = "https://json-server-pkle.onrender.com";

  // Signals (Angular 16+) para estado reativo
  usuarios = signal<Usuario[]>([]); // lista de usuários carregados da API
  filtro = signal<string>('');      // termo de pesquisa (nome/email)

  // Definição das colunas da tabela
  displayedColumns: string[] = ['nome', 'email', 'idade', 'acoes'];

  // DataSource da tabela (necessário para Material Table)
  dataSource = new MatTableDataSource<Usuario>([]);

  // Referências para paginação e ordenação da tabela
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {
    // Sempre que "usuarios" mudar, a tabela será atualizada automaticamente
    effect(() => {
      this.dataSource.data = this.usuariosFiltrados();
    });
  }

  // Carregar lista de usuários ao iniciar o componente
  ngOnInit() {
    this.carregarUsuarios();
  }

  // Conectar paginador e ordenação à tabela após renderização da view
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Buscar usuários na API e atualizar signal
  carregarUsuarios() {
    this.http.get<Usuario[]>(this.API).subscribe({
      next: data => this.usuarios.set(data), // sucesso -> define a lista
      error: () => this.usuarios.set([])     // erro -> zera a lista
    });
  }

  // Função para excluir um usuário
  deletarUsuario(id: String) {
    this.http.delete(`${this.API}/${id}`).subscribe(() => this.carregarUsuarios());

    // Feedback visual com MatSnackBar
    this.snackBar.open('Usuário excluído com sucesso!', 'Fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  // Navega para a rota de edição passando o ID do usuário
  editarUsuario(id: String) {
    this.router.navigate(['/editar', id]);
  }

  // Navega para a tela de cadastro de novo usuário
  adicionarUsuario() {
    this.router.navigate(['/adicionar']);
  }

  // Volta para o menu inicial
  menuInicial() {
    this.router.navigate(['/home']);
  }

  // Computed: retorna os usuários filtrados por nome ou e-mail
  usuariosFiltrados = computed(() => {
    const f = this.filtro().trim().toLowerCase();
    if (!f) return this.usuarios(); 
    return this.usuarios().filter(u =>
      u.nome.toLowerCase().includes(f) || u.email.toLowerCase().includes(f)
    );
  });

  // Função para exportar a lista de usuários em formato PDF
  exportarPDF() {
    const doc = new jsPDF();
    doc.text('Relatório de Usuários', 14, 10);
    autoTable(doc, {
      startY: 20,
      head: [['Nome', 'Email', 'Idade']], 
      body: this.usuariosFiltrados().map(u => [
        u.nome,
        u.email,
        u.idade ?? '' 
      ]),
    });
    doc.save('Usuarios cadastrados.pdf'); 
  }
}
