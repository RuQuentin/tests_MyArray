import MyArray from '../index';

describe('Class MyArray', () => {
    describe('tests for instance', () => {
        let arr;

        beforeEach(() => {
            arr = new MyArray(1, 4, 0, 'orange', { a: 'name', b: 'user' });
        });

        test('The instance must return a specific value for a particular array index.', () => {
            expect(arr[3]).toBe('orange');
        });

        test('The instance mustn\'t be an instance of the class "Array"', () => {
            expect(arr instanceof Array).toBeFalsy();
            expect(arr).toBeInstanceOf(MyArray);
        });

        test('Instance dosn\'t have any own property except length', () => {
            expect(Object.keys(arr).length).toBe(1);
            expect(Object.keys(arr)).toHaveProperty('length');
        });

        test('Prototype have only declarated method and constructor', () => {
            const declaratedMethods = ['pop', 'find', 'slice', 'push', 'filter', 'map', 'forEach', 'reduce', 'toString', 'sort', 'constructor'].sort();
            const prototypeMethods = Reflect.ownKeys(MyArray.prototype).sort();

            expect(prototypeMethods).toEqual(declaratedMethods);
        });

        test('Class has only declarated static method and common like "length", "prototype", "name"', () => {
            const declaratedMethods = ["length", "prototype", "from", "name"].sort();
            const staticMethods = Reflect.ownKeys(MyArray).sort();

            expect(staticMethods).toEqual(declaratedMethods);
        });
    });
});