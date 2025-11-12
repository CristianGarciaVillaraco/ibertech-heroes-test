import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { fakeBackendProvider } from './fakeBack/fakeHttp_listhero';

@NgModule({ declarations: [
        AppComponent,
        PageNotFoundComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule], providers: [
        fakeBackendProvider,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
