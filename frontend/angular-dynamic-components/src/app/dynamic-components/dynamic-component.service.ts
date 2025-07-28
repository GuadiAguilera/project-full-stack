import { Injectable, ComponentRef, ViewContainerRef, TemplateRef } from '@angular/core';
import { CardComponent } from './components/card.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService {
  private componentRefs: ComponentRef<any>[] = [];

  createComponent(
    container: ViewContainerRef,
    componentType: any,
    content?: TemplateRef<unknown>,
    inputs?: { [key: string]: any }
  ): ComponentRef<any> {
    let projectableNodes: any[][] = [];

    // If content template is provided, create embedded view
    if (content) {
      const template = container.createEmbeddedView(content);
      projectableNodes = [template.rootNodes];
    }

    // Create the component
    const componentRef = container.createComponent(componentType, {
      projectableNodes
    });

    // Set inputs if provided
    if (inputs) {
      Object.entries(inputs).forEach(([key, value]) => {
        componentRef.setInput(key, value);
      });
    }

    // Store reference for cleanup
    this.componentRefs.push(componentRef);

    return componentRef;
  }

  createCardComponent(
    container: ViewContainerRef,
    content?: TemplateRef<unknown>,
    options?: {
      title?: string;
      description?: string;
      onRemove?: () => void;
    }
  ): ComponentRef<CardComponent> {
    const inputs: any = {};
    
    if (options?.title) {
      inputs.title = options.title;
    }
    if (options?.description) {
      inputs.description = options.description;
    }

    const componentRef = this.createComponent(container, CardComponent, content, inputs) as ComponentRef<CardComponent>;

    // Subscribe to remove event
    if (options?.onRemove) {
      componentRef.instance.remove.subscribe(() => {
        options.onRemove?.();
        this.destroyComponent(componentRef);
      });
    }

    return componentRef;
  }

  destroyComponent(componentRef: ComponentRef<any>): void {
    const index = this.componentRefs.indexOf(componentRef);
    if (index > -1) {
      this.componentRefs.splice(index, 1);
      componentRef.destroy();
    }
  }

  removeComponentByIndex(container: ViewContainerRef, index: number): void {
    if (index < container.length) {
      const componentRef = this.componentRefs[index];
      if (componentRef) {
        this.destroyComponent(componentRef);
      }
      container.remove(index);
    }
  }

  destroyAllComponents(): void {
    this.componentRefs.forEach(ref => ref.destroy());
    this.componentRefs = [];
  }

  getComponentCount(): number {
    return this.componentRefs.length;
  }
}
