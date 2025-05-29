import { inject, Injectable, InjectionToken, makeEnvironmentProviders, Type } from '@angular/core';
import { DynamicType } from '../types';

export function provideComponentControlResolver() {
  return makeEnvironmentProviders([
    { provide: COMPONENT_RESOLVER, useClass: TextInputResolver, multi: true },
    { provide: COMPONENT_RESOLVER, useClass: SelectResolver, multi: true }
  ]);
}

const COMPONENT_RESOLVER = new InjectionToken<ComponentResolver>('COMPONENT_RESOVLER');
export interface ComponentResolver {
  type: DynamicType;
  resolve(): Promise<Type<unknown>>
}

@Injectable()
export class TextInputResolver implements ComponentResolver {
  type = DynamicType.INPUT;
  resolve(): Promise<Type<unknown>> {
    return import('../components/text-input/text-input.component').then(c => c.HysTextInputComponent);
  }
}

@Injectable()
export class SelectResolver implements ComponentResolver {
  type = DynamicType.SELECT;
  resolve(): Promise<Type<unknown>> {
    return import('../components/select/select.component').then(c => c.HysSelectComponent);
  }
}

@Injectable()
export class HysComponentControlResolveService {
  private resolvers = inject<ComponentResolver[]>(COMPONENT_RESOLVER);

  resolve(type: DynamicType): Promise<Type<unknown>> | null {
    const strategy = this.resolvers.find(r => r.type === type);
    if (strategy) {
      return strategy.resolve();
    }
    return null;
  }
}
