import { AsyncPipe, NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicField, DynamicType, HysControllerWrapperComponent } from '@libs/hys-controller';
import { HysBaseDynamic } from '../../directives/base-dynamic.directive';
import { DynamicControlPipe } from '../../pipes/dynamic-control.pipe';
import { HysComponentControlResolveService } from '../../services/component-control-resolve.service';
import { HysButtonComponent } from '@libs/hys-button';

@Component({
  imports: [
    NgComponentOutlet,
    AsyncPipe,
    NgTemplateOutlet,
    ReactiveFormsModule,
    HysControllerWrapperComponent,
    DynamicControlPipe,
    HysButtonComponent,
  ],
  selector: 'hys-dynamic-filter',
  templateUrl: './dynamic-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HysComponentControlResolveService],
})
export class HysDynamicFilterComponent extends HysBaseDynamic {
  service = inject(HysComponentControlResolveService);
  override fields = input.required<DynamicField[]>();

  readonly DYNAMIC_TYPE = DynamicType;
}
