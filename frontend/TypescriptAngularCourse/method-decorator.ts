//Extiende como funciona un metodo

type methodDecoratorStructure = (
    method: Function,
    context: ClassMethodDecoratorContext
) => PropertyDescriptor | void;

function logMethod(method: Function, context: ClassMethodDecoratorContext): Function | void {
    return function (...args: any[]) {
        console.log(`Method ${String(context.name)} called with arguments: ${args}`);
        const result = method.apply(this, args);
        console.log(`Method ${String(context.name)} returned: ${result}`);
        return result;
    };
}
class Calculator {

    @logMethod
    sum(a: number, b: number) {
        return a + b;
    }
}

const calc = new Calculator();
calc.sum(1,2)