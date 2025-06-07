import { inject, Injectable, InjectionToken, makeEnvironmentProviders, Type } from '@angular/core';
import { DynamicType } from '../types';

export function provideComponentControlResolver() {
  return makeEnvironmentProviders([
    { provide: COMPONENT_RESOLVER, useClass: TextInputResolver, multi: true },
    { provide: COMPONENT_RESOLVER, useClass: TextareaResolver, multi: true },
    { provide: COMPONENT_RESOLVER, useClass: SelectResolver, multi: true },
    { provide: COMPONENT_RESOLVER, useClass: MultipleResolver, multi: true },
    { provide: COMPONENT_RESOLVER, useClass: ChipsInputResolver, multi: true },
  ]);
}

type ResolveType = {
  component: Promise<Type<unknown>>,
  inputs?: Record<string, unknown>
}

const COMPONENT_RESOLVER = new InjectionToken<ComponentResolver>('COMPONENT_RESOVLER');
export interface ComponentResolver {
  type: DynamicType;
  resolve(): ResolveType
}

@Injectable()
export class TextInputResolver implements ComponentResolver {
  type = DynamicType.INPUT;
  resolve() {
    return {
      component: import('../components/text-input/text-input.component').then(c => c.HysTextInputComponent),
    }
  }
}

@Injectable()
export class TextareaResolver implements ComponentResolver {
  type = DynamicType.TEXTAREA;
  resolve(): ResolveType {
    return {
      component: import('../components/text-input/text-input.component').then(c => c.HysTextInputComponent),
      inputs: {
        type: 'textarea'
      }
    }
  }
}

@Injectable()
export class SelectResolver implements ComponentResolver {
  type = DynamicType.SELECT;
  resolve() {
    return {
      component: import('../components/select/select.component').then(c => c.HysSelectComponent),
    }
  }
}


@Injectable()
export class MultipleResolver implements ComponentResolver {
  type = DynamicType.MULTIPLE;
  resolve(): ResolveType {
    return {
      component: import('../components/select/select.component').then(c => c.HysSelectComponent),
      inputs: {
        multiple: true
      }
    }
  }
}

@Injectable()
export class ChipsInputResolver implements ComponentResolver {
  type = DynamicType.CHIPS_INPUT;
  resolve(): ResolveType {
    return {
      component: import('../components/chips-input/chips-input.component').then(c => c.HysChipsInputComponent),
    }
  }
}

@Injectable()
export class HysComponentControlResolveService {
  private resolvers = inject<ComponentResolver[]>(COMPONENT_RESOLVER);

  resolve(type: DynamicType): ResolveType | null {
    const strategy = this.resolvers.find(r => r.type === type);
    if (strategy) {
      return strategy.resolve();
    }
    return null;
  }
}
