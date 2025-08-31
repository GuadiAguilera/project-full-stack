//configuracion normal de typescript - tsconfig.json
// {
//     "CompilerOptions": {
//         "target": "ES2022",
//         "experimentalDecorators": true,
//         "emitDecoratorMetadata": false,
//         "useDefineForClassFields": true
//     }
// }

interface User {
    name: string;
}

const user: User = {
    name: "John Doe"
};

class UserClass {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    getName(){
        return this.name;
    }
    setName(name: string) {
        this.name = name;
    }
}

const userClass : UserClass = new UserClass("Jane Doe");


