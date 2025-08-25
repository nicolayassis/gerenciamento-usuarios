import {
  FormBuilder,
  MatButtonModule,
  MatCommonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  ReactiveFormsModule,
  Validators,
  init_button,
  init_common_module,
  init_form_field,
  init_forms,
  init_icon,
  init_input
} from "./chunk-5MSKDPH5.js";
import {
  ActivatedRoute,
  HttpClient,
  Router,
  RouterOutlet,
  init_http,
  init_router
} from "./chunk-5MQOPCNS.js";
import {
  ChangeDetectionStrategy,
  CommonModule,
  Component,
  Directive,
  FactoryTarget,
  InjectionToken,
  Input,
  NgModule,
  ViewEncapsulation,
  __decorate,
  core_exports,
  init_common,
  init_core,
  init_tslib_es6,
  inject,
  ɵɵngDeclareClassMetadata,
  ɵɵngDeclareComponent,
  ɵɵngDeclareDirective,
  ɵɵngDeclareFactory,
  ɵɵngDeclareInjector,
  ɵɵngDeclareNgModule
} from "./chunk-6NAJQL7D.js";
import {
  __esm
} from "./chunk-HBW54YOI.js";

// angular:jit:template:src\app\components\adicionar-usuarios\adicionar-usuarios.html
var adicionar_usuarios_default;
var init_adicionar_usuarios = __esm({
  "angular:jit:template:src\\app\\components\\adicionar-usuarios\\adicionar-usuarios.html"() {
    adicionar_usuarios_default = `<h2 class="titulo">{{ idEdicao ? 'Editar Usu\xE1rio' : 'Adicionar Usu\xE1rio' }}</h2>\r
\r
<div style="margin-bottom: 16px; text-align: center">\r
  <button mat-raised-button color="primary" (click)="menuInicial()">\r
    <mat-icon>home</mat-icon> Menu Inicial\r
  </button>\r
</div>\r
\r
<mat-card class="usuario-card">\r
  <mat-card-header>\r
    <mat-card-title>\r
      {{ idEdicao ? 'Editar Usu\xE1rio' : 'Cadastro de Novo Usu\xE1rio' }}\r
    </mat-card-title>\r
    <mat-card-subtitle>\r
      Preencha os dados abaixo\r
    </mat-card-subtitle>\r
  </mat-card-header>\r
\r
  <mat-card-content>\r
    <form [formGroup]="form" (ngSubmit)="salvar()" class="form"\r
      style="display: flex; flex-direction: column; gap: 16px;">\r
\r
      <!-- Nome -->\r
      <mat-form-field appearance="outline">\r
        <mat-label>Nome</mat-label>\r
        <input matInput type="text" formControlName="nome" />\r
        <mat-error *ngIf="form.get('nome')?.touched && form.get('nome')?.invalid">\r
          <ng-container *ngIf="form.get('nome')?.errors?.['required']">\r
            Nome \xE9 obrigat\xF3rio.\r
          </ng-container>\r
          <ng-container *ngIf="form.get('nome')?.errors?.['minlength']">\r
            Nome deve ter no m\xEDnimo 3 caracteres.\r
          </ng-container>\r
          <ng-container *ngIf="form.get('nome')?.errors?.['pattern']">\r
            O nome n\xE3o pode conter n\xFAmeros ou caracteres especiais.\r
          </ng-container>\r
        </mat-error>\r
      </mat-form-field>\r
\r
      <!-- Email -->\r
      <mat-form-field appearance="outline">\r
        <mat-label>E-mail</mat-label>\r
        <input matInput type="email" formControlName="email" />\r
        <mat-error *ngIf="form.get('email')?.touched && form.get('email')?.invalid">\r
          Informe um e-mail v\xE1lido.\r
        </mat-error>\r
      </mat-form-field>\r
\r
      <!-- Idade -->\r
      <mat-form-field appearance="outline">\r
        <mat-label>Idade (opcional)</mat-label>\r
        <input matInput type="number" formControlName="idade" />\r
        <mat-error *ngIf="form.get('idade')?.touched && form.get('idade')?.invalid">\r
          Idade deve ser 18 ou mais.\r
        </mat-error>\r
      </mat-form-field>\r
\r
      <!-- Bot\xF5es -->\r
      <div class="botoes" style="display: flex; gap: 12px; margin-top: 12px;">\r
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">\r
          <mat-icon>save</mat-icon> Salvar\r
        </button>\r
        <button mat-raised-button color="warn" type="button" (click)="router.navigate(['/usuarios'])">\r
          <mat-icon>cancel</mat-icon> Cancelar\r
        </button>\r
      </div>\r
    </form>\r
  </mat-card-content>\r
</mat-card>\r
\r
<!-- Rotas -->\r
<router-outlet></router-outlet>\r
`;
  }
});

// angular:jit:style:src\app\components\adicionar-usuarios\adicionar-usuarios.css
var adicionar_usuarios_default2;
var init_adicionar_usuarios2 = __esm({
  "angular:jit:style:src\\app\\components\\adicionar-usuarios\\adicionar-usuarios.css"() {
    adicionar_usuarios_default2 = "/* src/app/components/adicionar-usuarios/adicionar-usuarios.css */\n.usuario-card {\n  max-width: 600px;\n  margin: 0 auto;\n  padding: 20px;\n}\n.titulo {\n  text-align: center;\n  margin-bottom: 16px;\n}\n/*# sourceMappingURL=adicionar-usuarios.css.map */\n";
  }
});

// node_modules/@angular/material/fesm2022/card.mjs
var MAT_CARD_CONFIG, MatCard, MatCardTitle, MatCardTitleGroup, MatCardContent, MatCardSubtitle, MatCardActions, MatCardHeader, MatCardFooter, MatCardImage, MatCardSmImage, MatCardMdImage, MatCardLgImage, MatCardXlImage, MatCardAvatar, CARD_DIRECTIVES, MatCardModule;
var init_card = __esm({
  "node_modules/@angular/material/fesm2022/card.mjs"() {
    "use strict";
    init_core();
    init_core();
    init_common_module();
    MAT_CARD_CONFIG = new InjectionToken("MAT_CARD_CONFIG");
    MatCard = class _MatCard {
      appearance;
      constructor() {
        const config = inject(MAT_CARD_CONFIG, { optional: true });
        this.appearance = config?.appearance || "raised";
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: _MatCard, deps: [], target: FactoryTarget.Component });
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "20.2.0-rc.1", type: _MatCard, isStandalone: true, selector: "mat-card", inputs: { appearance: "appearance" }, host: { properties: { "class.mat-mdc-card-outlined": 'appearance === "outlined"', "class.mdc-card--outlined": 'appearance === "outlined"', "class.mat-mdc-card-filled": 'appearance === "filled"', "class.mdc-card--filled": 'appearance === "filled"' }, classAttribute: "mat-mdc-card mdc-card" }, exportAs: ["matCard"], ngImport: core_exports, template: "<ng-content></ng-content>\n", styles: ['.mat-mdc-card{display:flex;flex-direction:column;box-sizing:border-box;position:relative;border-style:solid;border-width:0;background-color:var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));border-color:var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));border-radius:var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));box-shadow:var(--mat-card-elevated-container-elevation, var(--mat-sys-level1))}.mat-mdc-card::after{position:absolute;top:0;left:0;width:100%;height:100%;border:solid 1px rgba(0,0,0,0);content:"";display:block;pointer-events:none;box-sizing:border-box;border-radius:var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium))}.mat-mdc-card-outlined{background-color:var(--mat-card-outlined-container-color, var(--mat-sys-surface));border-radius:var(--mat-card-outlined-container-shape, var(--mat-sys-corner-medium));border-width:var(--mat-card-outlined-outline-width, 1px);border-color:var(--mat-card-outlined-outline-color, var(--mat-sys-outline-variant));box-shadow:var(--mat-card-outlined-container-elevation, var(--mat-sys-level0))}.mat-mdc-card-outlined::after{border:none}.mat-mdc-card-filled{background-color:var(--mat-card-filled-container-color, var(--mat-sys-surface-container-highest));border-radius:var(--mat-card-filled-container-shape, var(--mat-sys-corner-medium));box-shadow:var(--mat-card-filled-container-elevation, var(--mat-sys-level0))}.mdc-card__media{position:relative;box-sizing:border-box;background-repeat:no-repeat;background-position:center;background-size:cover}.mdc-card__media::before{display:block;content:""}.mdc-card__media:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__media:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mat-mdc-card-actions{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;min-height:52px;padding:8px}.mat-mdc-card-title{font-family:var(--mat-card-title-text-font, var(--mat-sys-title-large-font));line-height:var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));font-size:var(--mat-card-title-text-size, var(--mat-sys-title-large-size));letter-spacing:var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));font-weight:var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight))}.mat-mdc-card-subtitle{color:var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));font-family:var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));line-height:var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));font-size:var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));letter-spacing:var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));font-weight:var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight))}.mat-mdc-card-title,.mat-mdc-card-subtitle{display:block;margin:0}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle{padding:16px 16px 0}.mat-mdc-card-header{display:flex;padding:16px 16px 0}.mat-mdc-card-content{display:block;padding:0 16px}.mat-mdc-card-content:first-child{padding-top:16px}.mat-mdc-card-content:last-child{padding-bottom:16px}.mat-mdc-card-title-group{display:flex;justify-content:space-between;width:100%}.mat-mdc-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;margin-bottom:16px;object-fit:cover}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title{line-height:normal}.mat-mdc-card-sm-image{width:80px;height:80px}.mat-mdc-card-md-image{width:112px;height:112px}.mat-mdc-card-lg-image{width:152px;height:152px}.mat-mdc-card-xl-image{width:240px;height:240px}.mat-mdc-card-subtitle~.mat-mdc-card-title,.mat-mdc-card-title~.mat-mdc-card-subtitle,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-title-group .mat-mdc-card-title,.mat-mdc-card-title-group .mat-mdc-card-subtitle{padding-top:0}.mat-mdc-card-content>:last-child:not(.mat-mdc-card-footer){margin-bottom:0}.mat-mdc-card-actions-align-end{justify-content:flex-end}\n'], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: MatCard, decorators: [{
      type: Component,
      args: [{ selector: "mat-card", host: {
        "class": "mat-mdc-card mdc-card",
        "[class.mat-mdc-card-outlined]": 'appearance === "outlined"',
        "[class.mdc-card--outlined]": 'appearance === "outlined"',
        "[class.mat-mdc-card-filled]": 'appearance === "filled"',
        "[class.mdc-card--filled]": 'appearance === "filled"'
      }, exportAs: "matCard", encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>\n", styles: ['.mat-mdc-card{display:flex;flex-direction:column;box-sizing:border-box;position:relative;border-style:solid;border-width:0;background-color:var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));border-color:var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));border-radius:var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));box-shadow:var(--mat-card-elevated-container-elevation, var(--mat-sys-level1))}.mat-mdc-card::after{position:absolute;top:0;left:0;width:100%;height:100%;border:solid 1px rgba(0,0,0,0);content:"";display:block;pointer-events:none;box-sizing:border-box;border-radius:var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium))}.mat-mdc-card-outlined{background-color:var(--mat-card-outlined-container-color, var(--mat-sys-surface));border-radius:var(--mat-card-outlined-container-shape, var(--mat-sys-corner-medium));border-width:var(--mat-card-outlined-outline-width, 1px);border-color:var(--mat-card-outlined-outline-color, var(--mat-sys-outline-variant));box-shadow:var(--mat-card-outlined-container-elevation, var(--mat-sys-level0))}.mat-mdc-card-outlined::after{border:none}.mat-mdc-card-filled{background-color:var(--mat-card-filled-container-color, var(--mat-sys-surface-container-highest));border-radius:var(--mat-card-filled-container-shape, var(--mat-sys-corner-medium));box-shadow:var(--mat-card-filled-container-elevation, var(--mat-sys-level0))}.mdc-card__media{position:relative;box-sizing:border-box;background-repeat:no-repeat;background-position:center;background-size:cover}.mdc-card__media::before{display:block;content:""}.mdc-card__media:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__media:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mat-mdc-card-actions{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;min-height:52px;padding:8px}.mat-mdc-card-title{font-family:var(--mat-card-title-text-font, var(--mat-sys-title-large-font));line-height:var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));font-size:var(--mat-card-title-text-size, var(--mat-sys-title-large-size));letter-spacing:var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));font-weight:var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight))}.mat-mdc-card-subtitle{color:var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));font-family:var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));line-height:var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));font-size:var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));letter-spacing:var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));font-weight:var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight))}.mat-mdc-card-title,.mat-mdc-card-subtitle{display:block;margin:0}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle{padding:16px 16px 0}.mat-mdc-card-header{display:flex;padding:16px 16px 0}.mat-mdc-card-content{display:block;padding:0 16px}.mat-mdc-card-content:first-child{padding-top:16px}.mat-mdc-card-content:last-child{padding-bottom:16px}.mat-mdc-card-title-group{display:flex;justify-content:space-between;width:100%}.mat-mdc-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;margin-bottom:16px;object-fit:cover}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title{line-height:normal}.mat-mdc-card-sm-image{width:80px;height:80px}.mat-mdc-card-md-image{width:112px;height:112px}.mat-mdc-card-lg-image{width:152px;height:152px}.mat-mdc-card-xl-image{width:240px;height:240px}.mat-mdc-card-subtitle~.mat-mdc-card-title,.mat-mdc-card-title~.mat-mdc-card-subtitle,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-title-group .mat-mdc-card-title,.mat-mdc-card-title-group .mat-mdc-card-subtitle{padding-top:0}.mat-mdc-card-content>:last-child:not(.mat-mdc-card-footer){margin-bottom:0}.mat-mdc-card-actions-align-end{justify-content:flex-end}\n'] }]
    }], ctorParameters: () => [], propDecorators: { appearance: [{
      type: Input
    }] } });
    MatCardTitle = class _MatCardTitle {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: _MatCardTitle, deps: [], target: FactoryTarget.Directive });
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "20.2.0-rc.1", type: _MatCardTitle, isStandalone: true, selector: "mat-card-title, [mat-card-title], [matCardTitle]", host: { classAttribute: "mat-mdc-card-title" }, ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: MatCardTitle, decorators: [{
      type: Directive,
      args: [{
        selector: `mat-card-title, [mat-card-title], [matCardTitle]`,
        host: { "class": "mat-mdc-card-title" }
      }]
    }] });
    MatCardTitleGroup = class _MatCardTitleGroup {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: _MatCardTitleGroup, deps: [], target: FactoryTarget.Component });
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "20.2.0-rc.1", type: _MatCardTitleGroup, isStandalone: true, selector: "mat-card-title-group", host: { classAttribute: "mat-mdc-card-title-group" }, ngImport: core_exports, template: '<div>\n  <ng-content\n      select="mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]"></ng-content>\n</div>\n<ng-content select="[mat-card-image], [matCardImage],\n                    [mat-card-sm-image], [matCardImageSmall],\n                    [mat-card-md-image], [matCardImageMedium],\n                    [mat-card-lg-image], [matCardImageLarge],\n                    [mat-card-xl-image], [matCardImageXLarge]"></ng-content>\n<ng-content></ng-content>\n', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: MatCardTitleGroup, decorators: [{
      type: Component,
      args: [{ selector: "mat-card-title-group", encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: { "class": "mat-mdc-card-title-group" }, template: '<div>\n  <ng-content\n      select="mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]"></ng-content>\n</div>\n<ng-content select="[mat-card-image], [matCardImage],\n                    [mat-card-sm-image], [matCardImageSmall],\n                    [mat-card-md-image], [matCardImageMedium],\n                    [mat-card-lg-image], [matCardImageLarge],\n                    [mat-card-xl-image], [matCardImageXLarge]"></ng-content>\n<ng-content></ng-content>\n' }]
    }] });
    MatCardContent = class _MatCardContent {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: _MatCardContent, deps: [], target: FactoryTarget.Directive });
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "20.2.0-rc.1", type: _MatCardContent, isStandalone: true, selector: "mat-card-content", host: { classAttribute: "mat-mdc-card-content" }, ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: MatCardContent, decorators: [{
      type: Directive,
      args: [{
        selector: "mat-card-content",
        host: { "class": "mat-mdc-card-content" }
      }]
    }] });
    MatCardSubtitle = class _MatCardSubtitle {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: _MatCardSubtitle, deps: [], target: FactoryTarget.Directive });
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "20.2.0-rc.1", type: _MatCardSubtitle, isStandalone: true, selector: "mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]", host: { classAttribute: "mat-mdc-card-subtitle" }, ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: MatCardSubtitle, decorators: [{
      type: Directive,
      args: [{
        selector: `mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]`,
        host: { "class": "mat-mdc-card-subtitle" }
      }]
    }] });
    MatCardActions = class _MatCardActions {
      // TODO(jelbourn): deprecate `align` in favor of `actionPosition` or `actionAlignment`
      // as to not conflict with the native `align` attribute.
      /** Position of the actions inside the card. */
      align = "start";
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: _MatCardActions, deps: [], target: FactoryTarget.Directive });
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "20.2.0-rc.1", type: _MatCardActions, isStandalone: true, selector: "mat-card-actions", inputs: { align: "align" }, host: { properties: { "class.mat-mdc-card-actions-align-end": 'align === "end"' }, classAttribute: "mat-mdc-card-actions mdc-card__actions" }, exportAs: ["matCardActions"], ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: MatCardActions, decorators: [{
      type: Directive,
      args: [{
        selector: "mat-card-actions",
        exportAs: "matCardActions",
        host: {
          "class": "mat-mdc-card-actions mdc-card__actions",
          "[class.mat-mdc-card-actions-align-end]": 'align === "end"'
        }
      }]
    }], propDecorators: { align: [{
      type: Input
    }] } });
    MatCardHeader = class _MatCardHeader {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: _MatCardHeader, deps: [], target: FactoryTarget.Component });
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "20.2.0-rc.1", type: _MatCardHeader, isStandalone: true, selector: "mat-card-header", host: { classAttribute: "mat-mdc-card-header" }, ngImport: core_exports, template: '<ng-content select="[mat-card-avatar], [matCardAvatar]"></ng-content>\n<div class="mat-mdc-card-header-text">\n  <ng-content\n      select="mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]"></ng-content>\n</div>\n<ng-content></ng-content>\n', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: MatCardHeader, decorators: [{
      type: Component,
      args: [{ selector: "mat-card-header", encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: { "class": "mat-mdc-card-header" }, template: '<ng-content select="[mat-card-avatar], [matCardAvatar]"></ng-content>\n<div class="mat-mdc-card-header-text">\n  <ng-content\n      select="mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]"></ng-content>\n</div>\n<ng-content></ng-content>\n' }]
    }] });
    MatCardFooter = class _MatCardFooter {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: _MatCardFooter, deps: [], target: FactoryTarget.Directive });
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "20.2.0-rc.1", type: _MatCardFooter, isStandalone: true, selector: "mat-card-footer", host: { classAttribute: "mat-mdc-card-footer" }, ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: MatCardFooter, decorators: [{
      type: Directive,
      args: [{
        selector: "mat-card-footer",
        host: { "class": "mat-mdc-card-footer" }
      }]
    }] });
    MatCardImage = class _MatCardImage {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: _MatCardImage, deps: [], target: FactoryTarget.Directive });
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "20.2.0-rc.1", type: _MatCardImage, isStandalone: true, selector: "[mat-card-image], [matCardImage]", host: { classAttribute: "mat-mdc-card-image mdc-card__media" }, ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: MatCardImage, decorators: [{
      type: Directive,
      args: [{
        selector: "[mat-card-image], [matCardImage]",
        host: { "class": "mat-mdc-card-image mdc-card__media" }
      }]
    }] });
    MatCardSmImage = class _MatCardSmImage {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: _MatCardSmImage, deps: [], target: FactoryTarget.Directive });
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "20.2.0-rc.1", type: _MatCardSmImage, isStandalone: true, selector: "[mat-card-sm-image], [matCardImageSmall]", host: { classAttribute: "mat-mdc-card-sm-image mdc-card__media" }, ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: MatCardSmImage, decorators: [{
      type: Directive,
      args: [{
        selector: "[mat-card-sm-image], [matCardImageSmall]",
        host: { "class": "mat-mdc-card-sm-image mdc-card__media" }
      }]
    }] });
    MatCardMdImage = class _MatCardMdImage {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: _MatCardMdImage, deps: [], target: FactoryTarget.Directive });
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "20.2.0-rc.1", type: _MatCardMdImage, isStandalone: true, selector: "[mat-card-md-image], [matCardImageMedium]", host: { classAttribute: "mat-mdc-card-md-image mdc-card__media" }, ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: MatCardMdImage, decorators: [{
      type: Directive,
      args: [{
        selector: "[mat-card-md-image], [matCardImageMedium]",
        host: { "class": "mat-mdc-card-md-image mdc-card__media" }
      }]
    }] });
    MatCardLgImage = class _MatCardLgImage {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: _MatCardLgImage, deps: [], target: FactoryTarget.Directive });
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "20.2.0-rc.1", type: _MatCardLgImage, isStandalone: true, selector: "[mat-card-lg-image], [matCardImageLarge]", host: { classAttribute: "mat-mdc-card-lg-image mdc-card__media" }, ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: MatCardLgImage, decorators: [{
      type: Directive,
      args: [{
        selector: "[mat-card-lg-image], [matCardImageLarge]",
        host: { "class": "mat-mdc-card-lg-image mdc-card__media" }
      }]
    }] });
    MatCardXlImage = class _MatCardXlImage {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: _MatCardXlImage, deps: [], target: FactoryTarget.Directive });
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "20.2.0-rc.1", type: _MatCardXlImage, isStandalone: true, selector: "[mat-card-xl-image], [matCardImageXLarge]", host: { classAttribute: "mat-mdc-card-xl-image mdc-card__media" }, ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: MatCardXlImage, decorators: [{
      type: Directive,
      args: [{
        selector: "[mat-card-xl-image], [matCardImageXLarge]",
        host: { "class": "mat-mdc-card-xl-image mdc-card__media" }
      }]
    }] });
    MatCardAvatar = class _MatCardAvatar {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: _MatCardAvatar, deps: [], target: FactoryTarget.Directive });
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "20.2.0-rc.1", type: _MatCardAvatar, isStandalone: true, selector: "[mat-card-avatar], [matCardAvatar]", host: { classAttribute: "mat-mdc-card-avatar" }, ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: MatCardAvatar, decorators: [{
      type: Directive,
      args: [{
        selector: "[mat-card-avatar], [matCardAvatar]",
        host: { "class": "mat-mdc-card-avatar" }
      }]
    }] });
    CARD_DIRECTIVES = [
      MatCard,
      MatCardActions,
      MatCardAvatar,
      MatCardContent,
      MatCardFooter,
      MatCardHeader,
      MatCardImage,
      MatCardLgImage,
      MatCardMdImage,
      MatCardSmImage,
      MatCardSubtitle,
      MatCardTitle,
      MatCardTitleGroup,
      MatCardXlImage
    ];
    MatCardModule = class _MatCardModule {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: _MatCardModule, deps: [], target: FactoryTarget.NgModule });
      static \u0275mod = \u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: _MatCardModule, imports: [
        MatCommonModule,
        MatCard,
        MatCardActions,
        MatCardAvatar,
        MatCardContent,
        MatCardFooter,
        MatCardHeader,
        MatCardImage,
        MatCardLgImage,
        MatCardMdImage,
        MatCardSmImage,
        MatCardSubtitle,
        MatCardTitle,
        MatCardTitleGroup,
        MatCardXlImage
      ], exports: [
        MatCard,
        MatCardActions,
        MatCardAvatar,
        MatCardContent,
        MatCardFooter,
        MatCardHeader,
        MatCardImage,
        MatCardLgImage,
        MatCardMdImage,
        MatCardSmImage,
        MatCardSubtitle,
        MatCardTitle,
        MatCardTitleGroup,
        MatCardXlImage,
        MatCommonModule
      ] });
      static \u0275inj = \u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: _MatCardModule, imports: [MatCommonModule, MatCommonModule] });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.2.0-rc.1", ngImport: core_exports, type: MatCardModule, decorators: [{
      type: NgModule,
      args: [{
        imports: [MatCommonModule, ...CARD_DIRECTIVES],
        exports: [CARD_DIRECTIVES, MatCommonModule]
      }]
    }] });
  }
});

// src/app/components/adicionar-usuarios/adicionar-usuarios.ts
var AdicionarUsuariosComponent;
var init_adicionar_usuarios3 = __esm({
  "src/app/components/adicionar-usuarios/adicionar-usuarios.ts"() {
    "use strict";
    init_tslib_es6();
    init_adicionar_usuarios();
    init_adicionar_usuarios2();
    init_core();
    init_common();
    init_forms();
    init_http();
    init_router();
    init_form_field();
    init_input();
    init_button();
    init_icon();
    init_card();
    AdicionarUsuariosComponent = class AdicionarUsuariosComponent2 {
      API = "http://localhost:3000/usuarios";
      // Injeções de dependências
      fb = inject(FormBuilder);
      // Injeção do formuláio reativo
      http = inject(HttpClient);
      // Injeção das requisições HTTP
      router = inject(Router);
      // Injeção das rotas para navegação
      route = inject(ActivatedRoute);
      // Injeção para pegar o ID da URL
      // Função FormBuilder para cadastrar e validar os campos do formulário
      form = this.fb.group({
        nome: this.fb.nonNullable.control("", [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern("^[A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\xFF ]+$")
        ]),
        email: this.fb.nonNullable.control("", [
          Validators.required,
          Validators.email
        ]),
        idade: this.fb.control(null, { validators: [Validators.min(18)] })
      });
      idEdicao;
      // Objetivo é identificar se esta em modo de criação ou edição
      ngOnInit() {
        const id = this.route.snapshot.paramMap.get("id");
        this.idEdicao = id ? String(id) : void 0;
        if (this.idEdicao) {
          this.http.get(`${this.API}/${this.idEdicao}`).subscribe((usuario) => {
            this.form.patchValue({
              nome: usuario?.nome ?? "",
              email: usuario?.email ?? "",
              idade: usuario?.idade ?? null
            });
          });
        }
      }
      // Função para salvar as edições referente ao usuário selecionado
      salvar() {
        if (this.form.invalid) {
          this.form.markAllAsTouched();
          return;
        }
        const payload = this.form.value;
        const req$ = this.idEdicao ? this.http.put(`${this.API}/${this.idEdicao}`, payload) : this.http.post(this.API, payload);
        req$.subscribe(() => this.router.navigate(["/usuarios"]));
      }
      // Botão para retornar ao menu inicial
      menuInicial() {
        this.router.navigate(["/home"]);
      }
    };
    AdicionarUsuariosComponent = __decorate([
      Component({
        selector: "app-adicionar-usuarios",
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
          MatCardModule
        ],
        template: adicionar_usuarios_default,
        styles: [adicionar_usuarios_default2]
      })
    ], AdicionarUsuariosComponent);
  }
});

export {
  AdicionarUsuariosComponent,
  init_adicionar_usuarios3 as init_adicionar_usuarios
};
//# sourceMappingURL=chunk-TSKYADJW.js.map
