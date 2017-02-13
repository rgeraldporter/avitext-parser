const Maybe_ = x =>
({
    map: f => x ? Maybe_(f(x)) : Maybe_(null),
    isNothing: () => x === null || x === undefined,
    join: () => x ? x : Maybe_(null),
    emit: () => x,
    fold: f => f(x)
});

const Maybe = {
    of: x => Maybe_(x)
};

export {Maybe as default};
