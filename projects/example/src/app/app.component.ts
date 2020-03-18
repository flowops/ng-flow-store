import { Component } from '@angular/core';
import { NStore } from 'projects/n-store/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'example';
  constructor(private store: NStore<any>) {
  }
  
  change() {
    this.store.dispatch({type: 'TEST', payload: {work: 'test'}});

  }
}
