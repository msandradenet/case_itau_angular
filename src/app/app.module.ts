import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID } from '@angular/core';
import { CurrencyMaskModule } from "ng2-currency-mask";

//Define o local para PT-BR
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt)

import { AppComponent } from './app.component';
import { MenuComponent } from './navegacao/menu/menu.component';
import { HomeComponent } from './navegacao/home/home.component';
import { FooterComponent } from './navegacao/footer/footer.component';

import { rootRouterConfig } from './app.routes';

import { FundoService } from './servicos/fundo.service';
import { FundosComponent } from './fundo/fundo.component';
import { FundoEditarComponent } from './fundo/fundo-editar/fundo-editar.component';
import { FundoCriarComponent } from './fundo/fundo-criar/fundo-criar.component';


const maskConfig: Partial<IConfig> = {
  validation: true
};

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent,
    FundosComponent,
    FundoEditarComponent,
    FundoCriarComponent
  ],
  imports: [
    BrowserModule,
    [RouterModule.forRoot(rootRouterConfig, { useHash: false })],
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    NgxMaskModule.forRoot(maskConfig),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CurrencyMaskModule
  ],
  providers: [
    FundoService,
    {provide: APP_BASE_HREF, useValue: '/'},
    [{provide: LOCALE_ID, useValue: 'pt-BR'}]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
