import {
  AdicionarUsuariosComponent,
  init_adicionar_usuarios
} from "./chunk-5BUKXHOK.js";
import "./chunk-CKW445J5.js";
import {
  TestBed,
  init_testing
} from "./chunk-JE4D3IYO.js";
import {
  __async,
  __commonJS
} from "./chunk-DKJGMCMN.js";

// src/app/components/adicionar-usuarios/adicionar-usuarios.spec.ts
var require_adicionar_usuarios_spec = __commonJS({
  "src/app/components/adicionar-usuarios/adicionar-usuarios.spec.ts"(exports) {
    init_testing();
    init_adicionar_usuarios();
    describe("AdicionarUsuarios", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [AdicionarUsuariosComponent]
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
