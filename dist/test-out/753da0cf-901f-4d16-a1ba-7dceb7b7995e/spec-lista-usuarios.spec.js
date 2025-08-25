import {
  ListaUsuariosComponent,
  init_lista_usuarios
} from "./chunk-6H5C7Z2D.js";
import "./chunk-AU2ZB5DK.js";
import {
  RouterTestingModule,
  init_testing as init_testing2
} from "./chunk-N2TZ24OE.js";
import {
  HttpClientModule,
  init_http
} from "./chunk-TJAVUH5Q.js";
import "./chunk-6O4WFL46.js";
import {
  TestBed,
  init_testing
} from "./chunk-FN2VD2QB.js";
import {
  __async,
  __commonJS
} from "./chunk-DKJGMCMN.js";

// src/app/components/lista-usuarios/lista-usuarios.spec.ts
var require_lista_usuarios_spec = __commonJS({
  "src/app/components/lista-usuarios/lista-usuarios.spec.ts"(exports) {
    init_testing();
    init_lista_usuarios();
    init_http();
    init_testing2();
    describe("ListaUsuarios", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [ListaUsuariosComponent, HttpClientModule, RouterTestingModule]
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
