import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

// Bibliotecas do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adicionar-usuarios',
  standalone: true, // ✅ Componente standalone (não precisa de NgModule)
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,

    // Módulos Angular Material utilizados neste componente
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  templateUrl: './adicionar-usuarios.html',
  styleUrls: ['./adicionar-usuarios.css']
})
export class AdicionarUsuariosComponent implements OnInit {
  // URL base da API (json-server neste caso)
  private readonly API = 'http://localhost:3000/usuarios';

  // Injeções de dependências via `inject` (recurso Angular 14+)
  private fb = inject(FormBuilder);         // Criação e validação de formulários reativos
  private http = inject(HttpClient);        // Requisições HTTP
  public router = inject(Router);           // Navegação entre rotas
  private route = inject(ActivatedRoute);   // Captura de parâmetros da URL (ex: id do usuário)
  private snackBar = inject(MatSnackBar);   // Exibição de mensagens (feedback para o usuário)

  // Definição do formulário e suas validações
  form = this.fb.group({
    nome: this.fb.nonNullable.control('', [
      Validators.required,                        // Campo obrigatório
      Validators.minLength(3),                    // Mínimo de 3 caracteres
      Validators.pattern('^[A-Za-zÀ-ÖØ-öø-ÿ ]+$') // Apenas letras e espaços
    ]),
    email: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.email                            // Validação de e-mail
    ]),
    idade: this.fb.control<number | null>(null, {
      validators: [Validators.min(18)]            // Idade mínima de 18 anos
    })
  });

  // Armazena o id do usuário em caso de edição
  idEdicao?: string;

  ngOnInit() {
    // Captura o id da URL (se existir)
    const id = this.route.snapshot.paramMap.get('id');
    this.idEdicao = id ? String(id) : undefined;

    // Caso esteja em modo de edição, busca os dados do usuário para preencher o form
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

  // Função responsável por criar ou atualizar o usuário
  salvar() {
    // Caso os dados do formulário sejam inválidos
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Exibe erros nos campos
      return;
    }

    // Dados que serão enviados para a API
    const payload = this.form.value;

    // Define se será PUT (edição) ou POST (criação)
    const req$ = this.idEdicao
      ? this.http.put(`${this.API}/${this.idEdicao}`, payload)
      : this.http.post(this.API, payload);

    // Executa a requisição
    req$.subscribe(() => {
      // Mensagem de feedback para o usuário
      this.snackBar.open(
        this.idEdicao ? 'Usuário atualizado com sucesso!' : 'Usuário salvo com sucesso!',
        'Fechar',
        {
          duration: 3000,              
          horizontalPosition: 'right', 
          verticalPosition: 'top',     
        }
      );

      // Após salvar, retorna para a página de listagem de usuários
      this.router.navigate(['/usuarios']);
    });
  }

  // Navegação para o menu inicial
  menuInicial() {
    this.router.navigate(['/home']);
  }
}
