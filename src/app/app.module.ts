import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { AppRoutingModule } from './app.routing.module';
import { TooltipComponent } from './tooltip/tooltip.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TooltipDirective,
    TooltipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  entryComponents: [TooltipComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
