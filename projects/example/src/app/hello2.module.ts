import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NStoreModule } from 'projects/n-store/src/public-api';





@NgModule({
    imports: [
        CommonModule,
        NStoreModule.forFeature('anotherFeature', {wick: '', kek: ['kik']})
    ]
})
export class Hello2Module {}