import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NStoreModule } from 'projects/n-store/src/public-api';





@NgModule({
    imports: [
        CommonModule,
        NStoreModule.forFeature('some_test', {foo: 'f', bar: []})
    ]
})
export class HelloModule {}