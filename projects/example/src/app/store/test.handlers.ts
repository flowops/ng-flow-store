import { Injectable } from "@angular/core";
import { NStore } from 'projects/n-store/src/public-api';



@Injectable({providedIn: 'root'})
export class TestHandlers {
    constructor(private store: NStore<any>) {
        store.registerActionHandler('CHANGE', this.changeHandler);
    }

    changeHandler = (controller: NStore<any>, action) => {
        const state = controller.getCurrentState();

        controller.setState({
            ...state,
            foo: action.payload
        });
    }
}
