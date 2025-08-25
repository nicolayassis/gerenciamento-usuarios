import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarUsuariosComponent } from './adicionar-usuarios';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

describe('AdicionarUsuarios', () => {
  let component: AdicionarUsuariosComponent;
  let fixture: ComponentFixture<AdicionarUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarUsuariosComponent, HttpClientModule, CommonModule, ReactiveFormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => null } }, // simula não ter parâmetro
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdicionarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
