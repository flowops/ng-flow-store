import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NStoreModule } from 'projects/n-store/src/public-api';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NStoreModule.forRoot({environment, initialState: {foo: 'bar'}, enableLogging: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
