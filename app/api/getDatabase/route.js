export async function GET() {
  const databaseID = "030e0309-a36c-46b3-80f9-724a8915fbf6";
  try {
    const url = `https://api.notion.com/v1/databases/${databaseID}/query`;
    console.log(url)
    const token = 'Bearer secret_OQrpMdx8y6DNht3rVbgGLav9eRgOpLXKEGtrE0PXJD9';
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
    // console.log("local data", data);

    return Response.json({ val: 1, data });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'An error occurred' });
  }
}
