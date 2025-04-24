import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, contentChildren, effect, inject, input, TemplateRef } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from "@angular/material/table";
import { AppAny, AppPageOfData } from '@libs/core';
import { ColumnTemplateDirective } from './directives/column-template.directive';
import { ExtractColumnKeysPipe } from './pipes/extract-column-keys.pipe';
import { Column } from './types';
import { PAGE_SIZE_OPTIONS } from './table.const';

@Component({
  selector: 'lib-table',
  imports: [
    MatTableModule,
    ExtractColumnKeysPipe,
    NgTemplateOutlet,
    MatPaginatorModule,
    DecimalPipe,
  ],
  templateUrl: './table.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './table.component.scss',
})
export class TableComponent<
  TData extends AppPageOfData<Record<string, AppAny>> = AppPageOfData<Record<string, AppAny>>,
  TColumn extends Column = Column,
> {
  readonly cdr = inject(ChangeDetectorRef);

  data = input.required<TData>();
  columns = input.required<TColumn[]>();

  templates = contentChildren(ColumnTemplateDirective);
  templatesMapper: Record<string, TemplateRef<unknown>> = {};

  readonly PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

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
