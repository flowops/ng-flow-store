import { InjectionToken } from '@angular/core';

export interface Config {
    environment: any;
    initialState: any;
    enableLogging?: boolean;
  }
  

export const CONFIG = new InjectionToken<Config>('CONFIG');
