addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

const MONGODB_API_URL = 'https://eu-west-2.aws.data.mongodb-api.com/app/data-ihjvhxe/endpoint/data/v1/action';
const MONGODB_API_KEY = 'c2Q3BTimleTDzoFAlC5q8Oh1rlGSWNB0fPLMJMlKguQMVfi1SULHX4ZsHmAhgXLS';
const DB_NAME = 'phonebook';
const COLLECTION_NAME = 'people';

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  console.log(`Handling request for path: ${path}`); // Log the path

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  try {
    let response;
    if (path === '/api/persons') {
      if (request.method === 'GET') {
        response = await fetchMongoDB('find', {});
        return new Response(JSON.stringify(response.documents || []), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      } else if (request.method === 'POST') {
        const body = await request.json();
        if (!body.name || !body.number) {
          return new Response(JSON.stringify({ error: 'name or number missing' }), {
            status: 400,
            headers: { 'Access-Control-Allow-Origin': '*' }
          });
        }
        if (body.name.length < 3) {
          return new Response(JSON.stringify({ error: 'name must be at least 3 characters long' }), {
            status: 400,
            headers: { 'Access-Control-Allow-Origin': '*' }
          });
        }
        const phoneRegex = /^\d{2,3}-\d{5,}$/;
        if (!phoneRegex.test(body.number)) {
          return new Response(JSON.stringify({ error: 'number must be of the format XX-XXXXX or XXX-XXXXX' }), {
            status: 400,
            headers: { 'Access-Control-Allow-Origin': '*' }
          });
        }
        const exists = await fetchMongoDB('find', { filter: { name: body.name } });
        if (exists.documents && exists.documents.length > 0) {
          return new Response(JSON.stringify({ error: 'name must be unique' }), {
            status: 400,
            headers: { 'Access-Control-Allow-Origin': '*' }
          });
        }
        const person = {
          name: body.name,
          number: body.number
        };
        response = await fetchMongoDB('insertOne', { document: person });
        return new Response(JSON.stringify(response), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
    } else if (path.startsWith('/api/persons/')) {
      const parts = path.split('/');
      const id = parts[parts.length - 1];
      console.log(`URL parts: ${JSON.stringify(parts)}`); // Log the URL parts
      console.log(`Extracted ID: ${id}`); // Log the extracted ID

      if (!id) {
        return new Response('ID is missing', { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } });
      }
      // Validate the ID
      if (!/^[a-f\d]{24}$/i.test(id)) {
        return new Response('Invalid ID format', { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } });
      }
      if (request.method === 'PUT') {
        const body = await request.json();
        const { _id, ...updateData } = body; // Exclude _id from update
        console.log(`Updating person with ID: ${id} and body:`, updateData); // Log the body for debugging
        response = await fetchMongoDB('updateOne', { filter: { _id: { $oid: id } }, update: { $set: updateData } });
        console.log('Update response:', response); // Log the response for debugging
        if (response.modifiedCount && response.modifiedCount > 0) {
          return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*' } });
        } else {
          return new Response('Not Found', { status: 404, headers: { 'Access-Control-Allow-Origin': '*' } });
        }
      } else if (request.method === 'DELETE') {
        console.log(`Attempting to delete person with ID: ${id}`);
        response = await fetchMongoDB('deleteOne', { filter: { _id: { $oid: id } } });
        console.log('Delete response:', response);
        if (response.deletedCount && response.deletedCount > 0) {
          return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*' } });
        } else {
          return new Response('Not Found', { status: 404, headers: { 'Access-Control-Allow-Origin': '*' } });
        }
      }
    } else if (path === '/info') {
      const countResponse = await fetchMongoDB('find', {});
      const info = `
        <p>Phonebook has info for ${countResponse.documents.length} people</p>
        <p>${new Date()}</p>
      `;
      return new Response(info, {
        headers: { 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*' }
      });
    } else {
      return new Response('Not Found', { status: 404, headers: { 'Access-Control-Allow-Origin': '*' } });
    }
  } catch (error) {
    console.error(`Error in handleRequest: ${error.message}`);
    return new Response(`Error: ${error.message}`, { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } });
  }
}

async function fetchMongoDB(action, body = {}) {
  try {
    console.log(`Fetching MongoDB action: ${action} with body:`, body);
    const response = await fetch(`${MONGODB_API_URL}/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': MONGODB_API_KEY,
      },
      body: JSON.stringify({
        dataSource: 'Cluster0',
        database: DB_NAME,
        collection: COLLECTION_NAME,
        ...body,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`MongoDB API error: ${response.statusText}, ${errorText}`);
      throw new Error(`MongoDB API error: ${response.statusText}, ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`fetchMongoDB error: ${error.message}`);
    throw error;
  }
}
