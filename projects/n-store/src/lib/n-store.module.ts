import { NgModule, ModuleWithProviders } from '@angular/core';
import {  ENVIRONMENT, ENABLE_LOGGING, INITIAL_STATE } from './constants';
import { StateInjectorService } from './state-injector.service';




@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [StateInjectorService]
})
export class NStoreModule {
  static initState = {};
  static forRoot(config: {environment: any; enableLogging: boolean}): ModuleWithProviders<NStoreModule> {
    return {
      ngModule: NStoreModule,
      providers: [
        {provide: ENVIRONMENT, useValue: config.environment},
        {provide: ENABLE_LOGGING, useValue: config.enableLogging},
        {provide: INITIAL_STATE, useValue: this.initState},
      ]
    };
  }

  static forFeature(featureName: string, state: any): ModuleWithProviders<NStoreModule> {
    // tslint:disable-next-line: no-string-literal
    this.initState[featureName] = state;
    return {
      ngModule: NStoreModule,
      providers: [
        {provide: INITIAL_STATE, useValue: this.initState},
      ]
    };
  }

  static forManifest(config: {initialState: any}): ModuleWithProviders<NStoreModule> {
    // tslint:disable-next-line: no-string-literal
    this.initState['manifest'] = config.initialState;
    return {
      ngModule: NStoreModule,
      providers: [
        {provide: INITIAL_STATE, useValue: this.initState},
      ]
    };
  }
  
 }
