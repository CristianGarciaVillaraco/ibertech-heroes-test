import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { fakeBackendProvider } from './fakeBack/fakeHttp_listhero';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
