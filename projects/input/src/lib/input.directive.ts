import { Directive } from '@angular/core';

@Directive({
  selector: '[libInput]',
  standalone: true,
  host: {
    'class': `block
      w-[300px]
      py-2
      px-4
      text-gray-900
      placeholder-gray-500
      bg-white
      border
      border-gray-300
      rounded-lg
      focus:outline-none
      focus:ring-1
      focus:ring-black-500
      focus:border-transparent
    `
  }
})
export class InputDirective {

}
