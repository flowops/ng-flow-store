import { NgModule, ModuleWithProviders } from '@angular/core';
import { CONFIG, Config } from './constants';




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
        {provide: CONFIG, useValue: config},
      ]
    };
  }
 }
