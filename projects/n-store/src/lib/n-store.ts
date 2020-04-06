import { Injectable, Inject } from '@angular/core';
import { EventEmitter } from 'events';
import { BehaviorSubject} from 'rxjs';
import { map, filter } from 'rxjs/operators';
import {path, clone} from 'ramda';
import { ENABLE_LOGGING, ENVIRONMENT, INITIAL_STATE } from './constants';
import { Action } from './action.type';
import * as jmespath from 'jmespath';
@Injectable({
  providedIn: 'root'
})
export class NStore<T> {

  private actions$ = new EventEmitter();
  private actionStream$ = new BehaviorSubject<any>(null);
  private state$ = new BehaviorSubject<any>(this.initialState);
  currentState = this.initialState;
  constructor(
    @Inject(ENVIRONMENT) private environment: any,
    @Inject(ENABLE_LOGGING) private enableLogging: boolean,
    @Inject(INITIAL_STATE) private initialState: any
    ) {
    if (this.enableLogging) {
      this.state$.asObservable().subscribe(manifestState => {
        this.currentState = clone(manifestState);
        console.log({ CURRENT_STATE: this.currentState });
      });
    }
  }

  registerActionHandler(actionType: string, handlerFunc: (controller: NStore<T>, action) => any) {
    this.actions$.on(actionType, (controller, action) => {
      if (this.enableLogging) {
        console.log(action);
      }
      handlerFunc(controller, action);
    });
    return this;
  }

  /**
   * Many to many relation for setting multiple actions and handlers at the same time.
   * @param actionTypes Array of action names
   * @param handlerFuncs Array of handlers
   */
  registerHandlers(actionTypes: string[], handlerFuncs: ((controller: NStore<T>, action) => any)[]) {
    actionTypes.forEach(actionType => {
      handlerFuncs.forEach(handlerFunc => {
        this.actions$.on(actionType, (controller, action) => {
          if (this.enableLogging) {
            console.log(action);
          }
          handlerFunc(controller, action);
        });
      });
    });
    return this;
  }

  get stateObservable() {
    return this.state$.asObservable();
  }

   actionsOfType(...actionNames: string[]) {
    return this.actionStream$.pipe(
      filter(action => actionNames.includes(action.type))
    );
  }

  /**
   * Querying and selecting from the store using jmespath style.
   * @param queryDef jmespath query syntax
   */
  query(queryDef: string) {
    return this.stateObservable.pipe(
      map(state => jmespath.search(state, queryDef))
    );
  }


  dispatch(action: Action | { type: string; payload: any }) {
    const actionType = action.type;
    this.actions$.emit(actionType, this, action);
    this.actionStream$.next(action);
  }

  select(selector: (state) => any) {
    return this.stateObservable.pipe(map(selector));
  }

  setState(newState: any) {
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
    return this.state$.asObservable().pipe;
  }
}
