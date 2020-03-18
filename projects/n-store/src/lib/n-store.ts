import { Injectable, Inject } from '@angular/core';
import { EventEmitter } from 'events';
import { BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import {path} from 'ramda';
import { CONFIG, Config } from './constants';
import { Action } from './action.type';
import {updatedDiff} from 'deep-object-diff';

@Injectable({
  providedIn: 'root'
})
export class NStore<T> {

  private actions$ = new EventEmitter();
  private state$ = new BehaviorSubject<any>(this.config.initialState);
  currentState;
  constructor(@Inject(CONFIG) private config: Config) {
    if (this.config.enableLogging) {
      this.state$.asObservable().subscribe(manifestState => {
        const DIFF = updatedDiff(this.currentState, manifestState);
        this.currentState = manifestState;
        console.log({ CURRENT_STATE: this.currentState, DIFF });
      });
    }
  }

  registerActionHandler(actionType: string, handlerFunc: (controller: NStore<T>, payload) => any) {
    this.actions$.on(actionType, handlerFunc);
    return this;
  }

  get stateObservable() {
    return this.state$.asObservable();
  }

  dispatch(action: Action | { type: string; payload: any }) {
    const actionType = action.type;
    this.actions$.emit(actionType, this, action);
    if (this.config.enableLogging) {
      console.log(action);
    }
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
