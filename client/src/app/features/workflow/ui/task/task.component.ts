import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { WorkflowTask } from '@features/workflow/data-access';
import { ChipComponent } from '@libs/chip';
import { HysIconPositionDirective } from '@libs/core';
import { HysButtonComponent } from '@libs/hys-button';

@Component({
  imports: [
    HysButtonComponent,
    ChipComponent,
    DatePipe,
    HysIconPositionDirective,
  ],
  selector: 'app-workflow-task-view',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': `p-4 border flex flex-col items-stretch justtify-between
    box-border bg-white text-black rounded gap-1`
  },
})
export class TaskViewComponent {
  task = input<WorkflowTask>();

}
