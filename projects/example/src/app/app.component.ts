import { Component } from '@angular/core';
import { NStore } from 'projects/n-store/src/public-api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'example';
  val$;
  constructor(private store: NStore<any>) {
    // this.val$ = store.select(state => state );
    this.val$ = store.pipe(map(st => st.foo))
  }
  
  change1() {
    this.store.dispatch({type: 'CHANGE', payload: {work2: 'workf'}});

  }

  change2() {
    this.store.dispatch({type: 'CHANGE', payload: {work2: 'dong work', work3: 'dancing'}});
  }

}
