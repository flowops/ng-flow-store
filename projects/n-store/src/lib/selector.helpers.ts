import {pipe} from 'ramda';
import { map } from 'rxjs/operators';

export const createSelector = pipe;

export const select = (selector: (state) => any) => {
  return map(selector);
};
