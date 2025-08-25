import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

// Bibliotecas do  Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-adicionar-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,

    // Angular Material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './adicionar-usuarios.html',
  styleUrls: ['./adicionar-usuarios.css']
})
export class AdicionarUsuariosComponent implements OnInit {
  private readonly API = 'http://localhost:3000/usuarios';

  // Injeções de dependências

  private fb = inject(FormBuilder);         // Injeção do formuláio reativo
  private http = inject(HttpClient);        // Injeção das requisições HTTP
  public router = inject(Router);           // Injeção das rotas para navegação
  private route = inject(ActivatedRoute);   // Injeção para pegar o ID da URL

  // Função FormBuilder para cadastrar e validar os campos do formulário
  form = this.fb.group({
    nome: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[A-Za-zÀ-ÖØ-öø-ÿ ]+$')
    ]),
    email: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.email
    ]),
    idade: this.fb.control<number | null>(null, { validators: [Validators.min(18)] })
  });

  idEdicao?: string;

  // Objetivo é identificar se esta em modo de criação ou edição
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Funcionário existe
    this.idEdicao = id ? String(id) : undefined;       // Funcionário não existe

    if (this.idEdicao) {
      this.http.get<any>(`${this.API}/${this.idEdicao}`).subscribe(usuario => {
        this.form.patchValue({
          nome: usuario?.nome ?? '',
          email: usuario?.email ?? '',
          idade: usuario?.idade ?? null
        });
      });
    }
  }

  // Função para salvar as edições referente ao usuário selecionado
  salvar() {
    if (this.form.invalid) {              // Validação dos dados inseridos
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.value;      // Envio dos campos para o JSON-SERVER 
    const req$ = this.idEdicao
      ? this.http.put(`${this.API}/${this.idEdicao}`, payload)
      : this.http.post(this.API, payload);

    // Retorna para a página de usuarios
    req$.subscribe(() => this.router.navigate(['/usuarios']));
  }

  // Botão para retornar ao menu inicial
  menuInicial() {
    this.router.navigate(['/home']);
  }
}
