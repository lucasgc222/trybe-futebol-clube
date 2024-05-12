export type status = 'successful'
| 'notFound'
| 'created'
| 'badRequest'
| 'unprocEntity'
| 'delete'
| 'unauthorized'
| 'conflict';

const statusHttpCode: { [key in status]: number } = {
  successful: 200,
  created: 201,
  delete: 204,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  conflict: 409,
  unprocEntity: 422,
};

export function statusHTTP(statusHttp: status): number {
  return statusHttpCode[statusHttp] || 500;
}
