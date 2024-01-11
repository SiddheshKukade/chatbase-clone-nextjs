
export async function GET() {
    const notionTokenEndpoint = 'https://api.notion.com/v1/oauth/token';
    const clientId = 'c11d73dd-6e07-4354-8cb6-230a73826598';
    const clientSecret = 'secret_Qb7Ilhi5BOpCHSRUNa25RNrXCQzbPiPUxjDBQoOkmBd';
    const redirectUri = 'http://localhost:3000/';
    const authorizationCode = '03acde96-7ece-4aa9-870e-248f72338e4b'; // Replace with your actual code
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
          'Authorization': 'Basic c11d73dd-6e07-4354-8cb6-230a73826598:secret_Qb7Ilhi5BOpCHSRUNa25RNrXCQzbPiPUxjDBQoOkmBd'
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
    //   console.log("local data", data);
  
      return Response.json({ val: 1, data });
    } catch (error) {
      console.error('Error:', error);
      return Response.json({ error: 'An error occurred' });
    }
  }
  