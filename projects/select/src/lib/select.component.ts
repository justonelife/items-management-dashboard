import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'lib-select',
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class SelectComponent {
  placeholder = input<string>();
}
