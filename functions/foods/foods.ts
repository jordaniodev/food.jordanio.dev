import { Handler } from '@netlify/functions';
import { Product, read, readAll, update } from './api';
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

export const handler: Handler = async (event, context) => {
  const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '')
  const segments = path.split('/').filter(e => e)

  switch (event.httpMethod) {

    case 'GET':
      if (segments.length === 0) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(readAll())
        }
      }

      if (segments.length === 1) {
        const id = Number(segments[0]);

        const lineSelected = read(id);

        if (!!lineSelected) {
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(read(id))
          }
        }
        return {
          statusCode: 404,
          headers,
          body: 'Line dont exist'
        }
      }

      return {
        statusCode: 422,
        headers,
        body: 'too many segments in GET request'
      }

    case 'POST':
      return {
        statusCode: 200,
        headers,
        body: event.body
      }
    case 'PUT':
      const id = Number(segments[0]);
      const body: Product = JSON.parse(event.body!) as Product;
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(update(id, body))
      }
    case 'DELETE':
      if (segments.length === 0) {
        return {
          statusCode: 422,
          headers,
          body: 'id is required'
        }
      }

      if (segments.length === 1) {
        return {
          statusCode: 200,
          headers,
        }
      }
      return {
        statusCode: 422,
        headers,
        body: 'too many segments in GET request'
      }
    default:
      return {
        statusCode: 405,
        headers,
        body: 'unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE'
      }
  }
}
