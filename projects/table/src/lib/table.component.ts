import { JsonPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, contentChildren, effect, inject, input, TemplateRef } from '@angular/core';
import { MatTableModule } from "@angular/material/table";
import { AppAny } from '@libs/core';
import { Column } from './types';
import { ExtractColumnKeysPipe } from './pipes/extract-column-keys.pipe';
import { ColumnTemplateDirective } from './directives/column-template.directive';

@Component({
  selector: 'lib-table',
  imports: [
    MatTableModule,
    JsonPipe,
    ExtractColumnKeysPipe,
    NgTemplateOutlet,
  ],
  templateUrl: './table.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<
  TItem extends Record<string, AppAny> = Record<string, AppAny>,
  TColumn extends Column = Column,
> {
  readonly cdr = inject(ChangeDetectorRef);

  data = input.required<TItem[]>();
  columns = input.required<TColumn[]>();

  templates = contentChildren(ColumnTemplateDirective);
  templatesMapper: Record<string, TemplateRef<unknown>> = {};

  constructor() {
    effect(() => {
      let updateTemplatesMapper: Record<string, TemplateRef<unknown>> = {};
      this.templates()?.forEach(template => {
        updateTemplatesMapper[template.key()] = template.templateRef;
      });
      this.templatesMapper = { ...updateTemplatesMapper };

      this.cdr.markForCheck();
    })
  }
}
