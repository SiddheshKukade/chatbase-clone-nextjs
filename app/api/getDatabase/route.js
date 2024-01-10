export async function GET() {
  const databaseID = "775552e7f0cb490da007ea5efeb9291b";
  try {
    const url = `https://api.notion.com/v1/databases/${databaseID}/query`;
    console.log(url)
    const token = 'Bearer secret_fmBmClVvok3UJPbIcpGgvrw9sJwlw0cHLC3WGWmAhtU';
    const notionVersion = '2022-02-22';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
        'Notion-Version': notionVersion,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
