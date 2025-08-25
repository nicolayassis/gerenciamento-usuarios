import {
  AdicionarUsuariosComponent,
  ReactiveFormsModule,
  init_adicionar_usuarios,
  init_forms
} from "./chunk-APOYUCI2.js";
import {
  ActivatedRoute,
  HttpClientModule,
  init_http,
  init_router
} from "./chunk-TJAVUH5Q.js";
import {
  CommonModule,
  TestBed,
  init_common,
  init_testing
} from "./chunk-FN2VD2QB.js";
import {
  __async,
  __commonJS
} from "./chunk-DKJGMCMN.js";

// src/app/components/adicionar-usuarios/adicionar-usuarios.spec.ts
var require_adicionar_usuarios_spec = __commonJS({
  "src/app/components/adicionar-usuarios/adicionar-usuarios.spec.ts"(exports) {
    init_testing();
    init_adicionar_usuarios();
    init_http();
    init_common();
    init_forms();
    init_router();
    describe("AdicionarUsuarios", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [AdicionarUsuariosComponent, HttpClientModule, CommonModule, ReactiveFormsModule],
          providers: [
            {
              provide: ActivatedRoute,
              useValue: {
                snapshot: { paramMap: { get: () => null } }
                // simula não ter parâmetro
              }
            }
          ]
        }).compileComponents();
        fixture = TestBed.createComponent(AdicionarUsuariosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_adicionar_usuarios_spec();
//# sourceMappingURL=spec-adicionar-usuarios.spec.js.map
