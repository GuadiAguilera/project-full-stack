# Angular Dynamic Components

Este proyecto demuestra cómo manejar **componentes dinámicos** en Angular de manera efectiva, separando la lógica de presentación (HTML) de la lógica de negocio (TypeScript).

## 🎯 Funcionalidades Implementadas

### ✅ Separación de Templates
- **HTML Templates**: Todos los templates están en archivos `.html` separados
- **TypeScript Logic**: La lógica está en archivos `.ts` usando `templateUrl`
- **CSS Styles**: Estilos separados en archivos `.css`

### ✅ Gestión de Componentes Dinámicos
1. **Crear Componentes**: Botón "Create component" para añadir nuevos componentes dinámicamente
2. **Eliminar Todos**: Botón "Remove all components" elimina todos los componentes de una vez
3. **Eliminar Individual**: Cada componente tiene su propio botón "Remove" para eliminarse individualmente
4. **Contador en Tiempo Real**: Muestra cuántos componentes están activos

### ✅ Arquitectura Organizada
- **DynamicComponentService**: Servicio para manejar la creación y destrucción de componentes
- **ComponentFactory**: Factory para configurar diferentes tipos de componentes
- **DynamicComponentManager**: Gestor avanzado para múltiples componentes con IDs únicos

## 📁 Estructura del Proyecto

```
src/app/
├── dynamic-components/
│   ├── components/
│   │   ├── card.component.ts
│   │   ├── card.component.html
│   │   └── card.component.css
│   ├── dynamic-component.service.ts
│   ├── dynamic-component.manager.ts
│   ├── component.factory.ts
│   └── index.ts
├── ng-template-outlet/
│   ├── app-ng-template.component.ts
│   ├── app-ng-template.component.html
│   └── step/
│       ├── step.component.ts
│       ├── step.component.html
│       ├── step-actions.component.ts
│       └── step-actions.component.html
├── app.component.ts
├── app.component.html
└── app.component.css
```

## 🚀 Características Técnicas

### Componentes Dinámicos
- Creación en tiempo de ejecución usando `ViewContainerRef`
- Proyección de contenido con `ng-content` y `ng-template`
- Gestión del ciclo de vida de componentes
- Inputs y outputs dinámicos

### Servicios y Gestión de Estado
- Inyección de dependencias para servicios de gestión
- Manejo de referencias de componentes
- Limpieza automática de memoria
- Contador de componentes activos

### Templates y Estilos
- Templates externos en archivos `.html`
- Estilos encapsulados por componente
- Responsive design y efectos hover
- Interfaz de usuario intuitiva

## 💡 Cómo Usar

1. **Crear Componente**: Haz clic en "Create component" para añadir un nuevo componente dinámico
2. **Eliminar Individual**: Usa el botón "Remove" de cada componente para eliminarlo específicamente
3. **Eliminar Todos**: Usa "Remove all components" para limpiar todos los componentes de una vez
4. **Monitorear**: El contador muestra cuántos componentes están activos en tiempo real

## 🔧 Tecnologías Utilizadas

- **Angular 18+** con Standalone Components
- **ViewContainerRef** para inyección dinámica
- **TemplateRef** para proyección de contenido
- **Services** para gestión de estado
- **CSS3** con efectos y transiciones
- **TypeScript** para tipado fuerte

## 📚 Conceptos Demostrados

- **Separación de responsabilidades**: HTML, CSS y TS en archivos separados
- **Componentes dinámicos**: Creación y destrucción en tiempo de ejecución
- **Gestión de memoria**: Limpieza adecuada de referencias
- **Arquitectura escalable**: Servicios y factories reutilizables
- **Templates avanzados**: ng-template y ng-content
- **Inyección de dependencias**: Servicios y gestores de componentes

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
