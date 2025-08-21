import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KanbanBoardComponent } from '@features/workflow/ui/kanban-board/kanban-board.component';

@Component({
  imports: [KanbanBoardComponent],
  selector: 'app-workflow-board-container',
  templateUrl: './board.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardContainerComponent {}
