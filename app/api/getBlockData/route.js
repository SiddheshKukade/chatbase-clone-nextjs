export async function POST(req ,res) {
    let queryData = await req.json();
  console.log("req data is ",queryData)
    const blockId = "32eab06a-2aa3-4e13-abde-011ec51fc89d";
    try {
        const url = `https://api.notion.com/v1/blocks/${queryData?.blockId}/children?page_size=100`;
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


        return Response.json({ val: 1, data});
    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: 'An error occurred' });
    }
}
