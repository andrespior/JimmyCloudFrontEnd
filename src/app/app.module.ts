import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MessagesComponent } from './messages/messages.component';
import { MatDialogModule } from '@angular/material/dialog';

import { AuthInterceptor } from './interceptors/auth.interceptor';

import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
