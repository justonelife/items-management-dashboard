import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Board } from '@features/challenges/data-access';
import { ChessBoardViewComponent } from '@features/challenges/ui/chess-board/chess-board.component';
import { CardComponent } from '@libs/card';
import { HysIconPositionDirective } from '@libs/core';
import { HysButtonComponent } from '@libs/hys-button';
import { HysNumberInputComponent } from '@libs/hys-controller';

@Component({
  imports: [
    HysIconPositionDirective,
    CardComponent,
    HysNumberInputComponent,
    HysButtonComponent,
    ReactiveFormsModule,
    ScrollingModule,
    ChessBoardViewComponent,
  ],
  selector: 'app-n-queen-visualizer',
  templateUrl: './n-queen-visualizer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col items-center gap-6',
  },
  styleUrl: './n-queen-visualizer.component.scss',
})
export class NqueenVisualizerComponent {
  numberOfQueens = new FormControl<number>(4);
  solutions = signal<Board[] | null>(null);
  answerString = signal<string>('');

  constructor() {
    effect(() => {
      const _solutions = this.solutions();
      if (!_solutions) {
        return;
      }
      if (_solutions.length) {
        return this.answerString.set(
          `Found ${_solutions.length} solution${_solutions.length > 1 ? 's' : ''}`,
        );
      } else {
        return this.answerString.set('No solutions found.');
      }
    });
  }

  solve(): void {
    const n = this.numberOfQueens.getRawValue();
    if (n == null) return;
    this.solutions.set(solver(n));
  }
}

const solver = (n: number): Board[] => {
  let result: Board[] = [];
  const answer: Board = Array.from({ length: n }, () => new Array(n).fill(0));
  const cols: boolean[] = new Array(n).fill(false);
  const mainDiags: boolean[] = new Array(2 * n - 1).fill(false);
  const subDiags: boolean[] = new Array(2 * n - 1).fill(false);

  function build(row: number): void {
    for (let col = 0; col < n; col++) {
      if (!cols[col] && !mainDiags[row + col] && !subDiags[row - col + n - 1]) {
        answer[row][col] = 1;
        cols[col] = true;
        mainDiags[row + col] = true;
        subDiags[row - col + n - 1] = true;

        if (row === n - 1) {
          result = [...result, JSON.parse(JSON.stringify(answer))];
        } else {
          build(row + 1);
        }

        answer[row][col] = 0;
        cols[col] = false;
        mainDiags[row + col] = false;
        subDiags[row - col + n - 1] = false;
      }
    }
  }

  build(0);

  return result;
};
