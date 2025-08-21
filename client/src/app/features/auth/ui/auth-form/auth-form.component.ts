import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col gap-4 items-center w-full',
  },
})
export class AppAuthFormComponent {
  greeting = input.required<string>();
  description = input.required<string>();
}
