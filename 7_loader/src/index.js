console.log('Hello JavaScript')


class Person {
    constructor(name) {
        this.name = name
    }
    setName(name) {
        this.name = name
    }
}

console.log(new Person('peter'))