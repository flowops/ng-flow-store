import { Injectable, Inject } from '@angular/core';
import { EventEmitter } from 'events';
import { BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import {path} from 'ramda';
import { INITIAL_MANIFEST_STATE, ENVIRONMENT } from './constants';
import { Action } from './action.type';

@Injectable({
  providedIn: 'root'
})
export class NStore<T> {

  private actions$ = new EventEmitter();
  private state$ = new BehaviorSubject<any>(this.initialState);
  constructor(@Inject(ENVIRONMENT) private environment: any, @Inject(INITIAL_MANIFEST_STATE) private initialState: any) {
    console.log({st: this.initialState});
    if (!environment.production) {
      this.state$.asObservable().subscribe(manifestStore => console.log({ manifestStore }));
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
  }

  select(selector: (state) => any) {
    return this.stateObservable.pipe(map(selector));
  }

  updateState(newState: any) {
    this.state$.next(newState);
  }

  getInitialState(slicePath: string[]) {
    if (slicePath) {
      return path(slicePath, this.initialState);
    } else {
      return this.initialState;
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
