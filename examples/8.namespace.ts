namespace Personnel {

    export function work(emp: Employee): void {
        console.log(emp.name, 'is working');
    }

    export interface IUser {
        displayInfo();
    }

    export class Employee {
        constructor(public name: string) {}
    }

    export const defaultUser = {
        name: 'Kate',
    };
}

const Bob = new Personnel.Employee('Bob');

Personnel.work(Bob);
