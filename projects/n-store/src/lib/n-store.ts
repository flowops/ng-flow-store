import { Injectable, Inject } from '@angular/core';
import { EventEmitter } from 'events';
import { BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import {path, clone} from 'ramda';
import { CONFIG, Config } from './constants';
import { Action } from './action.type';

@Injectable({
  providedIn: 'root'
})
export class NStore<T> {

  private actions$ = new EventEmitter();
  private state$ = new BehaviorSubject<any>(this.config.initialState);
  currentState = this.config.initialState;
  constructor(@Inject(CONFIG) private config: Config) {
    if (this.config.enableLogging) {
      this.state$.asObservable().subscribe(manifestState => {
        this.currentState = clone(manifestState);
        console.log({ CURRENT_STATE: this.currentState });
      });
    }
  }

  registerActionHandler(actionType: string, handlerFunc: (controller: NStore<T>, action) => any) {
    this.actions$.on(actionType, (controller, action) => {
      if (this.config.enableLogging) {
        console.log(action);
      }
      handlerFunc(controller, action);
    });
    return this;
  }

  get stateObservable() {
    return this.state$.asObservable();
  }

  dispatch(action: Action | { type: string; payload: any }) {
    const actionType = action.type;
    this.actions$.emit(actionType, this, action);
  }

  select(selector: (state) => any) {
    return this.stateObservable.pipe(map(selector));
  }

  updateState(newState: any) {
    this.state$.next(newState);
  }

  getInitialState(slicePath: string[]) {
    if (slicePath) {
      return path(slicePath, this.config.initialState);
    } else {
      return this.config.initialState;
    }
  }

  getCurrentState(slicePath?: string[]) {
    if (slicePath) {
      return path(slicePath, this.state$.value);
    } else {
      return this.state$.value;
    }
  }

  get pipe() {
    return this.state$.pipe;
  }
}
