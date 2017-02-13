const Count_ = x =>
({
    map: f => x ? Count_(f(x)) : Count_(null),
    isNothing: () => x === null || x === undefined,
    join: () => x ? x : Count_(null),
    toInt: () => x ? parseInt(x) : 0,
    emit: () => x,
    fold: f => f(x)
});

const Count = {
    of: x => Count_(x)
};

export {Count as default};
