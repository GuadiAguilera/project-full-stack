function mayus(
    _target: any,
    context: ClassAccessorDecoratorContext
) {
    return {
        get(this: any){
            return this[`_${String(context.name)}`].toUpperCase(); // el _ se usa para indicar que no se va a usar afuera
        },

        set(this: any, value: string){
            this[`_${String(context.name)}`] = value.toUpperCase();
        }
    }
}

class Persona{
    @mayus
    accessor nombre: string; // accessor dice que este atributo tiene getter y setter
}