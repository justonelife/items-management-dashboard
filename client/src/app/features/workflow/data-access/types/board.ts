import { WorkflowTask } from './task';

export interface WorkflowBoard {
  title: string;
  tasks: WorkflowTask[];
}
