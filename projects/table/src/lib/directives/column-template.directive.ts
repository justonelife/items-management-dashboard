import { Directive, inject, input, TemplateRef } from '@angular/core';

@Directive({ selector: '[libColumnTemplate]' })
export class ColumnTemplateDirective {
  readonly templateRef = inject(TemplateRef);

  key = input.required<string>({ alias: 'libColumnTemplate' });
}
