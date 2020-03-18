import { NgModule, ModuleWithProviders } from '@angular/core';
import { ENVIRONMENT, INITIAL_MANIFEST_STATE } from './constants';


interface Config {
  environment: any;
  initialState: any;
}


@NgModule({
  declarations: [],
  imports: [
  ],
  exports: []
})
export class NStoreModule {
  static forRoot(config: Config): ModuleWithProviders {
    return {
      ngModule: NStoreModule,
      providers: [
        {provide: INITIAL_MANIFEST_STATE, useValue: config.initialState},
        {provide: ENVIRONMENT, useValue: config.environment}
      ]
    };
  }
 }
