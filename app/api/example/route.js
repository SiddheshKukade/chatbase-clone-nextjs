export async function GET() {
  try {
    const url = 'https://api.notion.com/v1/blocks/32eab06a2aa34e13abde011ec51fc89d/children?page_size=100';
    const token = 'Bearer secret_fmBmClVvok3UJPbIcpGgvrw9sJwlw0cHLC3WGWmAhtU';
    const notionVersion = '2022-02-22';

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
        'Notion-Version': notionVersion,
      },
    });

    const data = await response.json();
    console.log("local data", data);

    return Response.json({ val: 1, data });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'An error occurred' });
  }
}
