import { Type } from '@angular/core';
import { CardComponent } from './components/card.component';

export interface DynamicComponentConfig {
  component: Type<any>;
  inputs?: { [key: string]: any };
  outputs?: { [key: string]: (event: any) => void };
}

export class ComponentFactory {
  static createCardConfig(options?: {
    title?: string;
    description?: string;
    onRemove?: () => void;
  }): DynamicComponentConfig {
    const config: DynamicComponentConfig = {
      component: CardComponent,
      inputs: {},
      outputs: {}
    };

    if (options?.title) {
      config.inputs!['title'] = options.title;
    }
    
    if (options?.description) {
      config.inputs!['description'] = options.description;
    }

    if (options?.onRemove) {
      config.outputs!['remove'] = options.onRemove;
    }

    return config;
  }

  static getAvailableComponents(): { [key: string]: Type<any> } {
    return {
      'card': CardComponent,
      // Add more components here as needed
    };
  }
}
