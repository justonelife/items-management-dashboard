import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

type IconPosition = 'left' | 'right';
type ButtonVariant = 'basic' | 'icon';

@Component({
  imports: [
    MatButtonModule,
    MatIconModule,
    NgTemplateOutlet,
  ],
  selector: 'a[hys-button], button[hys-button]',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HysButtonComponent {

  iconPosition = input<IconPosition>('left');
  icon = input<string>();
  variant = input<ButtonVariant>('basic');

  readonly BUTTON_CLASS = 'cursor-pointer inline-flex! items-center';
}
