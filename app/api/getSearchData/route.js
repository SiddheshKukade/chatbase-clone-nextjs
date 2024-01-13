
export async function POST(req, res) {
    let queryData = await req.json();
    const redirectUri = 'http://localhost:3000/';
    const accessToken = queryData?.accessToken;
    const notionVersion = '2022-02-22';
    const username = 'c11d73dd-6e07-4354-8cb6-230a73826598';
    const password = 'secret_OQrpMdx8y6DNht3rVbgGLav9eRgOpLXKEGtrE0PXJD9';
    try {
        console.log("in getSearchData ---->" , accessToken)
  
      const searchUrl = 'https://api.notion.com/v1/search';
      const searchPayload = { "page_size": 100 };
      const searchHeaders = {
        'accept': 'application/json',
        'Notion-Version': '2022-06-28',
        'content-type': 'application/json',
        'authorization': `Bearer ${accessToken}`,
      };
  
      const res2 = await fetch(searchUrl, {
        method: 'POST',
        headers: searchHeaders,
        body: JSON.stringify(searchPayload),
      });
  
      const data2 = await res2.json();
      console.log("data 2 is --> ", data2);
      const pgData = data2?.results?.filter(res => res?.object === "page")?.map(page => {
        return {
          pgName: page?.properties?.title?.title[0]?.text?.content,
          pgId: page?.id
        }
      })
      const tableData =  data2?.results.map(aa=> {
        return {
          name: aa?.object,
          url: aa?.url
        }
      })
      console.log("pgData is --> " ,pgData);
      return Response.json({ data: res2 , pgData , tableData, resultData: data2});
    } catch (error) {
      console.error('Error:', error);
      return Response.json({ error: 'An error occurred' });
    }
  }
  
  