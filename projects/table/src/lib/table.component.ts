import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, contentChildren, effect, inject, input, output, TemplateRef } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
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
  page = input<number>(1); // Start from 1
  pageIndex = computed(() => this.page() - 1); // Start from 0
  pageSize = input<number>();

  emitPageChange = output<PageEvent>();

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

  pageChange(event: PageEvent) {
    const actualEvent: PageEvent = {
      ...event,
      pageIndex: event.pageIndex + 1,
    }
    this.emitPageChange.emit(actualEvent);
  }
}
