import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TaskViewComponent } from '../task/task.component';
import { WorkflowBoard } from '@features/workflow/data-access';

@Component({
  imports: [
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    TaskViewComponent,
  ],
  selector: 'app-workflow-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoardComponent {

  boards: WorkflowBoard[] = mockBoards;
}

export const mockBoards: WorkflowBoard[] = [
  {
    title: 'backlog',
    tasks: [
      {
        title: 'Define user stories for new feature',
        description: 'Gather requirements from the product team and document acceptance criteria.',
        assignee: 'Alice',
        priority: 'medium',
        assignedAt: new Date('2025-05-20'),
      },
      {
        title: 'Research third-party integrations',
        description: 'Investigate possible APIs for payment gateway.',
        assignee: 'Bob',
        priority: 'low',
        assignedAt: new Date('2025-05-18'),
      },
      {
        title: 'Set up CI/CD pipeline skeleton',
        priority: 'low',
        assignedAt: new Date('2025-05-22'),
      },
    ],
  },
  {
    title: 'todo',
    tasks: [
      {
        title: 'Write unit tests for authentication module',
        description: 'Cover login, logout, and token-refresh logic.',
        assignee: 'Carol',
        priority: 'high',
        assignedAt: new Date('2025-05-25'),
      },
      {
        title: 'Create mock data generation script',
        description: 'Generate fake users, orders, and products for staging.',
        assignee: 'Dave',
        priority: 'medium',
        assignedAt: new Date('2025-05-27'),
      },
    ],
  },
  {
    title: 'in progress',
    tasks: [
      {
        title: 'Implement JWT token refresh logic',
        description: 'Ensure tokens are refreshed before expiration.',
        assignee: 'Eve',
        priority: 'high',
        assignedAt: new Date('2025-05-28'),
      },
      {
        title: 'Refactor sidebar navigation component',
        description: 'Make it responsive and add collapsible menu items.',
        assignee: 'Frank',
        priority: 'medium',
        assignedAt: new Date('2025-05-29'),
      },
      {
        title: 'Design database schema for reporting',
        priority: 'medium',
        assignedAt: new Date('2025-05-30'),
      },
    ],
  },
  {
    title: 'done',
    tasks: [
      {
        title: 'Configure ESLint and Prettier',
        description: 'Enforce consistent code style across the repo.',
        assignee: 'Grace',
        priority: 'low',
        assignedAt: new Date('2025-05-15'),
      },
      {
        title: 'Set up project boilerplate',
        description: 'Initialize Angular workspace and Git repo.',
        assignee: 'Heidi',
        priority: 'low',
        assignedAt: new Date('2025-05-10'),
      },
      {
        title: 'Create initial README.md',
        description: 'Add project overview and development setup instructions.',
        assignee: 'Ivan',
        priority: 'low',
        assignedAt: new Date('2025-05-12'),
      },
    ],
  },
];
