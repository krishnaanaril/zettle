import { Pipe, PipeTransform } from '@angular/core';
/*
 * Returns absolute value of an integer
 * Takes none as argument
 * Usage:
 *   value | abs
 * Example:
 *   {{ -2 | abs }}
 *   formats to: 2
*/
@Pipe({ name: 'abs' })
export class AbsoluteValuePipe implements PipeTransform {
    transform(value: number): number {
        return Math.abs(value);
    }
}
