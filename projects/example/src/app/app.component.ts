import { Component } from '@angular/core';
import { NStore } from 'projects/n-store/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'example';
  val$;
  constructor(private store: NStore<any>) {
    this.val$ = store.select(state => state );
  }
  
  change1() {
    this.store.dispatch({type: 'CHANGE', payload: {work2: () => 'workf'}});

  }

  change2() {
    this.store.dispatch({type: 'CHANGE', payload: {work2: 'dong work', work3: 'dancing'}});
  }

}
