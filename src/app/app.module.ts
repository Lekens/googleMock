import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {landingRouting} from './app.routing';

import {CoreModule} from './shared/modules/core/core.module';
import {SharedModules} from './shared/modules/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    landingRouting.components
  ],
  imports: [
    BrowserModule,
    landingRouting.routes,
    CoreModule,
    SharedModules,
  ],
  providers: [
    landingRouting.providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
