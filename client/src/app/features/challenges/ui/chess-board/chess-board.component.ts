import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Board } from '@features/challenges/data-access';
import { ChessBoardCellColor } from './pipes/cell-color.pipe';
import { NgClass } from '@angular/common';
import { HysIconPositionDirective } from '@libs/core';

@Component({
  imports: [
    ChessBoardCellColor,
    NgClass,
    HysIconPositionDirective,
  ],
  selector: 'chess-board-view',
  templateUrl: './chess-board.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'block w-[200px] h-[200px] rounded-md border border-gray-400 overflow-hidden'
  }
})
export class ChessBoardViewComponent {
  board = input.required<Board>();
  readonly QUEEN = 1;
}
