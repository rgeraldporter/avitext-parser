class Maybe {

    constructor(x) {

        this.__value = x;
    }

    map(f) {

        return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
    }

    isNothing() {

        return (this.__value === null || this.__value === undefined);
    }

    join() {

        return this.isNothing() ? Maybe.of(null) : this.__value;
    }

    emit() {

        return this.__value;
    }
}

Maybe.of = x => new Maybe(x);

export {Maybe as default};
