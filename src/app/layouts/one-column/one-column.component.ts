import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// TODO:  remove this component
@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'app-one-column-layout',
  template: `
    <main class="p-8 w-full h-svh">
      <router-outlet />
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OneColumnLayoutComponent {

}
