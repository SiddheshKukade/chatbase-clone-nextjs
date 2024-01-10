// 3b5ca960-a40c-42b1-ace9-8c1b56d0928c
import { NextRequest } from 'next/server';
export async function POST(req , res) {
  let queryData = await req.json();
  console.log("req data is ",queryData)
    const pageId="3b5ca960-a40c-42b1-ace9-8c1b56d0928c";
    try {
      const url = `https://api.notion.com/v1/blocks/${queryData?.pageId}/children?page_size=100`;
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
      // console.log("local data", data);
  
      return Response.json({ val: 1, data });
    } catch (error) {
      console.error('Error:', error);
      return Response.json({ error: 'An error occurred' });
    }
  }
  