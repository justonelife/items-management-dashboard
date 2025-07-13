import { SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'lib-read-more',
  imports: [SlicePipe],
  templateUrl: './read-more.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    'class': 'break-normal',
  }
})
export class ReadMoreComponent {

  content = input.required<string>();
  breakPoint = input<number>(50);
  limit = signal<number>(50);

  readMore(): void {
    this.limit.update(() => this.content().length);
  }

  readLess(): void {
    this.limit.update(() => this.breakPoint());
  }
}
