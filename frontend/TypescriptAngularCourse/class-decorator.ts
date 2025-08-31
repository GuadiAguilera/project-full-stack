// se usa para incrementar la funcionalidad de una clase
// es agregar funcionalidad extra a algo que no lo tiene
// se puede agregar a clases, métodos, propiedades, etc.

// metodo para agregar una propiedad a una clase
function gentlemanApproves<T extends { new(...args: any[]): {} }>(constructor: T, _context: ClassDecoratorContext) { // quion bajo en los parametros significa que no se utiliza
    return class extends constructor {
        gentleman = "Yes";
    }
}

@gentlemanApproves // es el decorador creado
class MyClass {
    myProperty: string;

    constructor() {
    }
}

const instance = new MyClass();
console.log((instance as any).gentleman);