import {
  AdicionarUsuariosComponent,
  init_adicionar_usuarios
} from "./chunk-TSKYADJW.js";
import {
  ReactiveFormsModule,
  init_forms
} from "./chunk-5MSKDPH5.js";
import {
  ActivatedRoute,
  HttpClientModule,
  init_http,
  init_router
} from "./chunk-5MQOPCNS.js";
import {
  CommonModule,
  TestBed,
  init_common,
  init_testing
} from "./chunk-6NAJQL7D.js";
import {
  __async,
  __commonJS
} from "./chunk-HBW54YOI.js";

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
