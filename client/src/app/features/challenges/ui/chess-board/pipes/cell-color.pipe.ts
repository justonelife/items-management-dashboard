import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chessBoardCellColor',
})
export class ChessBoardCellColor<LightBgClass = string, DarkBgClass = string> implements PipeTransform {
  transform(row: number, col: number, light: LightBgClass, dark: DarkBgClass): LightBgClass | DarkBgClass {
    return (row + col) % 2 === 0 ? light : dark;
  }
}
