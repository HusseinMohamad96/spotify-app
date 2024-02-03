import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { provideNativeDateAdapter } from "@angular/material/core";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterOutlet } from "@angular/router";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routes";
import { AuthInterceptor } from "./auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, provideAnimationsAsync(), provideNativeDateAdapter()],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }