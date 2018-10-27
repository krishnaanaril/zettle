import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn} from '@angular/forms';

@Directive({
  selector: '[appNoSpace]',
  providers: [{provide: NG_VALIDATORS, useExisting: NoSpaceDirective, multi: true}]
})
export class NoSpaceDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): {[key: string]: any} | null {
    return forbiddenNameValidator()(control);
  }

}

/** A hero's name can't match the given regular expression */
export function forbiddenNameValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = hasWhiteSpace(control.value);
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}

export function hasWhiteSpace(s) {
  return s && s.indexOf(' ') >= 0;
}
