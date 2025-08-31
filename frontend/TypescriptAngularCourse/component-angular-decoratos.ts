

function Component(config: {selector: string,template: string}){
    return function (target: any) {
        target.selector = config.selector;
        target.template = config.template;
    };
}

@Component({
  selector: 'app-my-component',
  template: '<h1>{{titulo}}</h1>',
})
class MyComponent {
  selector!: string;
  template!: string;
  
  titulo: string = 'Título del Componente';
}
