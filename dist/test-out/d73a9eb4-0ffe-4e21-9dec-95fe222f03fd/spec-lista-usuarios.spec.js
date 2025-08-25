import {
  ListaUsuariosComponent,
  init_lista_usuarios
} from "./chunk-MSDRCQCY.js";
import "./chunk-AU2ZB5DK.js";
import "./chunk-PUSIEMVC.js";
import {
  TestBed,
  init_testing
} from "./chunk-JE4D3IYO.js";
import {
  __async,
  __commonJS
} from "./chunk-DKJGMCMN.js";

// src/app/components/lista-usuarios/lista-usuarios.spec.ts
var require_lista_usuarios_spec = __commonJS({
  "src/app/components/lista-usuarios/lista-usuarios.spec.ts"(exports) {
    init_testing();
    init_lista_usuarios();
    describe("ListaUsuarios", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [ListaUsuariosComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(ListaUsuariosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_lista_usuarios_spec();
//# sourceMappingURL=spec-lista-usuarios.spec.js.map
