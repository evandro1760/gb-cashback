const initTimer = (delta) => (request, response, next) => {
    response.setTimeout(delta, () => response.status(504).json({
        error: true,
        message: 'timeout',
    }));
    return next();
};

export {
    initTimer as default,
};
