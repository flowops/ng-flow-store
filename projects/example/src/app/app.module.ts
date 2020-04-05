import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NStoreModule } from 'projects/n-store/src/public-api';
import { environment } from '../environments/environment';
import { TestHandlers } from './store/test.handlers';
import { HelloModule } from './hello.module';
import { Hello2Module } from './hello2.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NStoreModule.forRoot({enableLogging: true, environment: {production: false}}),
    HelloModule,
    Hello2Module,
  ],
  providers: [TestHandlers],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(tet: TestHandlers) {}
}
