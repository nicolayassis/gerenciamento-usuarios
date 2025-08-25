import {
  ListaUsuariosComponent,
  init_lista_usuarios
} from "./chunk-22DGW2RW.js";
import "./chunk-GXYXVD6U.js";
import {
  RouterTestingModule,
  init_testing as init_testing2
} from "./chunk-7P4D7KLP.js";
import "./chunk-5MSKDPH5.js";
import {
  HttpClientModule,
  init_http
} from "./chunk-5MQOPCNS.js";
import "./chunk-OSWP5O42.js";
import {
  TestBed,
  init_testing
} from "./chunk-6NAJQL7D.js";
import {
  __async,
  __commonJS
} from "./chunk-HBW54YOI.js";

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
