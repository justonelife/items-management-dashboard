import { Directive, inject, input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[hysDynamicControllerTemplate]',
  standalone: true,
})
export class HysDynamicControllerTemplate {
  readonly templateRef = inject(TemplateRef);

  key = input.required<string>({ alias: 'hysDynamicControllerTemplate' });
}
