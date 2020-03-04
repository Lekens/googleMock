import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from '../../components/header/header.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {SearchComponent} from '../../components/search/search.component';
import {LanguageComponent} from '../../components/language/language.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    SearchComponent,
    LanguageComponent
  ],
  entryComponents: [],
  providers: [  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    SearchComponent,
    FooterComponent,
    LanguageComponent


  ]
})
export class SharedModules { }
