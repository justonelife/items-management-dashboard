import { Directive } from '@angular/core';

@Directive({
  selector: '[libInput]',
  standalone: true,
  host: {
    'class': `block
    w-[300px]
    h-[41px]
    px-4
    placeholder:text-[#4c4546]
    bg-white
    border
    border-gray-300
    rounded-md
    focus:outline-none
    focus:border-transparent
    focus:ring-1
    focus:ring-black-500
    `
  }
})
export class InputDirective {

}
