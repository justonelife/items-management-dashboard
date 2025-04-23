import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { ColumnTemplateDirective } from './directives/column-template.directive';

@NgModule({
  imports: [
    TableComponent,
    ColumnTemplateDirective,
  ],
  exports: [
    TableComponent,
    ColumnTemplateDirective,
  ],
})
export class TableModule { }

