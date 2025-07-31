import { ChangeDetectionStrategy, Component, computed, inject, Injectable, InjectionToken, input } from '@angular/core';
import { HysIconPositionDirective, SeverityDirective } from '@libs/core';

type ButtonVariant = 'normal' | 'icon' | 'raised' | 'outlined';
const VARIANT_RESOLVER = new InjectionToken<IVariantResolve>('VARIANT_RESOLVER');

interface IVariantResolve {
  variant: ButtonVariant;
  getClass(): string;
}

@Injectable()
class NormalVariantResolver implements IVariantResolve {
  variant: ButtonVariant = 'normal';
  getClass(): string {
    return '';
  }
}

@Injectable()
class IconVariantResolver implements IVariantResolve {
  variant: ButtonVariant = 'icon';
  getClass(): string {
    return 'hys-bg-transparent text-black! dark:text-white! px-1!';
  }
}

@Injectable()
class RaisedVariantResolver implements IVariantResolve {
  variant: ButtonVariant = 'raised';
  getClass(): string {
    return 'shadow-lg';
  }
}

@Injectable()
class OutlinedVariantResolver implements IVariantResolve {
  variant: ButtonVariant = 'outlined';
  getClass(): string {
    return 'hys-bg-transparent border border-gray-300 text-black! dark:text-white!';
  }
}

@Component({
  selector: 'a[hys-button], button[hys-button]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      inputs: ['severity'],
      directive: SeverityDirective,
    },
    {
      inputs: ['hysIconPosition', 'icon', 'iconSet'],
      directive: HysIconPositionDirective,
    }
  ],
  styleUrl: './button.component.scss',
  host: {
    '[class]': 'klass()'
  },
  providers: [
    { provide: VARIANT_RESOLVER, useClass: NormalVariantResolver, multi: true },
    { provide: VARIANT_RESOLVER, useClass: IconVariantResolver, multi: true },
    { provide: VARIANT_RESOLVER, useClass: RaisedVariantResolver, multi: true },
    { provide: VARIANT_RESOLVER, useClass: OutlinedVariantResolver, multi: true },
  ]
})
export class HysButtonComponent {
  variantResolvers = inject<IVariantResolve[]>(VARIANT_RESOLVER);

  variant = input<ButtonVariant>('normal');

  readonly DEFAULT_CLASS = 'cursor-pointer inline-flex items-center justify-center p-1 px-4 font-normal h-[40px]';

  klass = computed(() => {
    const variant = this.variant()
    try {
      const klassByVariant = this.variantResolvers.filter(v => v.variant === variant)[0].getClass();
      return `${this.DEFAULT_CLASS} ${klassByVariant}`;
    } catch {
      return this.DEFAULT_CLASS;
    }
  });

}

