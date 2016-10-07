class Count {

    constructor(x) {

        this.__value = x;
    }

    map(f) {

        return this.isNothing() ? Count.of(null) : Count.of(f(this.__value));
    }

    isNothing() {

        return (this.__value === null || this.__value === undefined);
    }

    join() {

        return this.isNothing() ? Count.of(null) : this.__value;
    }
}

Count.of = x => new Count(x);

export {Count as default};
