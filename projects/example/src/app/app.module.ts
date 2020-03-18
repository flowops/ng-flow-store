import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NStoreModule } from 'projects/n-store/src/public-api';
import { environment } from '../environments/environment';
import { TestHandlers } from './store/test.handlers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NStoreModule.forRoot({environment, initialState: {foo: {work: 'bar'}}, enableLogging: true})
  ],
  providers: [TestHandlers],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(tet: TestHandlers) {}
}
