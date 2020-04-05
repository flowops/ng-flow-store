import { InjectionToken } from '@angular/core';

export interface Config {
    environment: any;
    initialState: any;
    enableLogging?: boolean;
  }


export const ENVIRONMENT = new InjectionToken<any>('ENVIRONMENT');
export const INITIAL_STATE = new InjectionToken<any>('INITIAL_STATE');
export const ENABLE_LOGGING = new InjectionToken<boolean>('ENABLE_LOGGING');
