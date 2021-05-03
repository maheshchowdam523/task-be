export function response(res, statusCode, payload) {
    return res.status(statusCode).json(payload);
}