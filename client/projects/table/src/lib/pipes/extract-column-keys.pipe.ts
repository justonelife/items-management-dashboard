import { Pipe, PipeTransform } from '@angular/core';
import { Column } from '../types';

@Pipe({
  name: 'libExtractColumnKeys',
  standalone: true,
})
export class ExtractColumnKeysPipe implements PipeTransform {
  transform(columns: Column[]): string[] {
    if (!columns?.length) return [];
    return columns.map(column => column.key);
  }
}
