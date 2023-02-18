import { Handler } from '@netlify/functions';
import { Product, read, readAll, update } from './api';

export const handler: Handler = async (event, context) => {
  const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '')
  const segments = path.split('/').filter(e => e)

  switch (event.httpMethod) {

    case 'GET':
      if (segments.length === 0) {
        return {
          statusCode: 200,
          body: readAll()
        }
      }

      if (segments.length === 1) {
        const id = Number(segments[0]);

        const lineSelected = read(id);

        if (!!lineSelected) {
          return {
            statusCode: 200,
            body: read(id)
          }
        }
        return {
          statusCode: 404,
          body: 'Line dont exist'
        }
      }

      return {
        statusCode: 422,
        body: 'too many segments in GET request'
      }

    case 'POST':
      return {
        statusCode: 200,
        body: event.body
      }
    case 'PUT':
      const id = Number(segments[0]);
      const body: Product = JSON.parse(event.body!) as Product;
      return {
        statusCode: 200,
        body: update(id, body)
      }
    case 'DELETE':
      if (segments.length === 0) {
        return {
          statusCode: 422,
          body: 'id is required'
        }
      }

      if (segments.length === 1) {
        const id = Number(segments[0]);
        const lineWillDelete = read(id);
        if (!!lineWillDelete) {
          return {
            statusCode: 200,
          }
        }

        return {
          statusCode: 404,
          body: 'This row dont exist'
        }
      }

      return {
        statusCode: 422,
        body: 'too many segments in GET request'
      }
    default:
      return {
        statusCode: 405,
        body: 'unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE'
      }
  }
}
