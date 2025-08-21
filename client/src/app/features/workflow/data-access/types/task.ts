export type WorkflowTaskPriority = 'low' | 'medium' | 'high';

export interface WorkflowTask {
  title: string;
  description?: string;
  assignee?: string;
  priority: WorkflowTaskPriority;
  assignedAt: Date;
}
