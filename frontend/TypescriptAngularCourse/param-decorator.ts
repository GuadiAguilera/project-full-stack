import "reflect-metadata";

function registrarYmodificarArgumentos(
    method: Function,
    context: ClassMethodDecoratorContext
){
    return function(...args: any[]) {
        const argsModified = args.map((arg) => {
            typeof arg === "string" ? arg.toUpperCase() : arg;
            console.log(`Argumento modificado: ${arg}`);

            return method.apply(this, argsModified);
        })
    }
}

class Saludar{

    @registrarYmodificarArgumentos
    saludar(parametro: string){
        console.log(`Hola ${parametro}`);
    }
}