import {
  Component,
  ComponentRef,
  inject,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { CardComponent } from './dynamic-components/components/card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  container = viewChild.required('container', { read: ViewContainerRef });
  content = viewChild.required<TemplateRef<unknown>>('content');
  
  // Array para mantener todas las referencias de componentes
  componentRefs: ComponentRef<CardComponent>[] = [];
  componentCounter = 0;

  createComponent() {
    this.componentCounter++;
    
    // Crear el template embebido
    const template = this.container().createEmbeddedView(this.content());

    // Crear el componente dinámico
    const componentRef = this.container().createComponent(CardComponent, {
      projectableNodes: [template.rootNodes],
    });

    // Configurar inputs
    componentRef.setInput('title', `Dynamic Component #${this.componentCounter}`);
    componentRef.instance.description = `This is dynamically created component number ${this.componentCounter}`;

    // Suscribirse al evento remove para eliminar solo este componente
    componentRef.instance.remove.subscribe(() => {
      this.removeIndividualComponent(componentRef);
    });

    // Guardar la referencia
    this.componentRefs.push(componentRef);
  }

  removeAllComponents() {
    // Destruir todos los componentes
    this.componentRefs.forEach(ref => ref.destroy());
    
    // Limpiar el contenedor
    this.container().clear();
    
    // Resetear el array y contador
    this.componentRefs = [];
    this.componentCounter = 0;
    
    console.log('All components removed');
  }

  private removeIndividualComponent(componentRef: ComponentRef<CardComponent>) {
    // Encontrar el índice del componente en el array
    const index = this.componentRefs.indexOf(componentRef);
    
    if (index > -1) {
      // Remover del array
      this.componentRefs.splice(index, 1);
      
      // Destruir el componente
      componentRef.destroy();
      
      console.log(`Individual component removed. Remaining: ${this.componentRefs.length}`);
    }
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }

  getComponentCount(): number {
    return this.componentRefs.length;
  }
}
