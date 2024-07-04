export const ENDPOINT_SERVICE =
  process.env.NODE_ENV === 'production'
    ? ''
    : 'localhost:9090'