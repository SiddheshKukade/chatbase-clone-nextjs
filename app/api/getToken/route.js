
export async function GET() {
    const notionTokenEndpoint = 'https://api.notion.com/v1/oauth/token';
    const clientId = 'your_client_id';
    const clientSecret = 'your_client_secret';
    const redirectUri = 'http://localhost:3000/';
    const authorizationCode = '03619873-f1d2-4ecd-975a-3e01cd2f014e'; // Replace with your actual code
    const username = 'c11d73dd-6e07-4354-8cb6-230a73826598';
const password = 'secret_Qb7Ilhi5BOpCHSRUNa25RNrXCQzbPiPUxjDBQoOkmBd';
    try {
    //   const url = `https://api.notion.com/v1/blocks/${pageId}/children?page_size=100`;
    //   const token = 'Bearer secret_fmBmClVvok3UJPbIcpGgvrw9sJwlw0cHLC3WGWmAhtU';
    //   const notionVersion = '2022-02-22';
  
      const response = await fetch(notionTokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          code: authorizationCode,
          redirect_uri: redirectUri,
          client_id: clientId,
          client_secret: clientSecret,
          username: username,
          password: password,
        }),
      });
  
      const data = await response.json();
      console.log("local data", data);
  
      return Response.json({ val: 1, data });
    } catch (error) {
      console.error('Error:', error);
      return Response.json({ error: 'An error occurred' });
    }
  }
  