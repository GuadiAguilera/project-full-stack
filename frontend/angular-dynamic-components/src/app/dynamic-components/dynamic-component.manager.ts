import { Injectable, ComponentRef, ViewContainerRef, TemplateRef, Type, Injector } from '@angular/core';
import { DynamicComponentConfig } from './component.factory';

export interface ComponentInstance {
  id: string;
  componentRef: ComponentRef<any>;
  config: DynamicComponentConfig;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentManager {
  private components = new Map<string, ComponentInstance>();
  private componentCounter = 0;

  createComponent(
    container: ViewContainerRef,
    config: DynamicComponentConfig,
    content?: TemplateRef<unknown>,
    injector?: Injector
  ): string {
    const id = this.generateId();
    
    let projectableNodes: any[][] = [];

    // If content template is provided, create embedded view
    if (content) {
      const template = container.createEmbeddedView(content);
      projectableNodes = [template.rootNodes];
    }

    // Create the component
    const componentRef = container.createComponent(config.component, {
      projectableNodes,
      injector
    });

    // Set inputs if provided
    if (config.inputs) {
      Object.entries(config.inputs).forEach(([key, value]) => {
        componentRef.setInput(key, value);
      });
    }

    // Subscribe to outputs if provided
    if (config.outputs) {
      Object.entries(config.outputs).forEach(([key, handler]) => {
        const outputProperty = componentRef.instance[key];
        if (outputProperty && typeof outputProperty.subscribe === 'function') {
          outputProperty.subscribe((event: any) => {
            handler(event);
          });
        }
      });
    }

    // Store component instance
    const instance: ComponentInstance = {
      id,
      componentRef,
      config,
      createdAt: new Date()
    };

    this.components.set(id, instance);

    return id;
  }

  destroyComponent(id: string): boolean {
    const instance = this.components.get(id);
    if (instance) {
      instance.componentRef.destroy();
      this.components.delete(id);
      return true;
    }
    return false;
  }

  getComponent(id: string): ComponentInstance | undefined {
    return this.components.get(id);
  }

  getAllComponents(): ComponentInstance[] {
    return Array.from(this.components.values());
  }

  destroyAllComponents(): void {
    this.components.forEach(instance => {
      instance.componentRef.destroy();
    });
    this.components.clear();
  }

  getComponentCount(): number {
    return this.components.size;
  }

  updateComponentInput(id: string, inputKey: string, value: any): boolean {
    const instance = this.components.get(id);
    if (instance) {
      instance.componentRef.setInput(inputKey, value);
      // Update the config for future reference
      if (!instance.config.inputs) {
        instance.config.inputs = {};
      }
      instance.config.inputs[inputKey] = value;
      return true;
    }
    return false;
  }

  private generateId(): string {
    return `component_${++this.componentCounter}_${Date.now()}`;
  }
}
