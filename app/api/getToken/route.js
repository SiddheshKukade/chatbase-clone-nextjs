
export async function POST(req, res) {
  let queryData = await req.json();
  // console.log(queryData)
  const redirectUri = process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL_REDIRECT_URI;
  const authorizationCode = queryData?.authCode;
  const notionVersion = '2022-02-22';
  const username = 'c11d73dd-6e07-4354-8cb6-230a73826598';
  const password = 'secret_OQrpMdx8y6DNht3rVbgGLav9eRgOpLXKEGtrE0PXJD9';
  try {
    const keySecret = `${username}:${password}`;
    console.log("key secret", keySecret, "authcode", authorizationCode)
    const b64EncodedKey = btoa(keySecret);
    const baseUrl = 'https://api.notion.com/v1/oauth/token';
    const authHeaders = {
      'Authorization': `Basic ${b64EncodedKey}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    };

    const authData = {
      'grant_type': 'authorization_code',
      'code': authorizationCode,
      'redirect_uri': redirectUri,
    };
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: authHeaders,
      body: new URLSearchParams(authData).toString(),
    })
    // console.log("response", response)
    const data = await response.json();
    console.log("1 access token", data?.access_token);
    const accessToken = data?.access_token;


    // const searchUrl = 'https://api.notion.com/v1/search';
    // const searchPayload = { "page_size": 100 };
    // const searchHeaders = {
    //   'accept': 'application/json',
    //   'Notion-Version': '2022-06-28',
    //   'content-type': 'application/json',
    //   'authorization': `Bearer ${accessToken}`,
    // };

    // const res2 = await fetch(searchUrl, {
    //   method: 'POST',
    //   headers: searchHeaders,
    //   body: JSON.stringify(searchPayload),
    // });

    // const data2 = await res2.json();
    // //name and id
    // // console.log("data 2 is ".data2);
    // const pgData = data2?.results?.filter(res => res?.object === "page")?.map(page => {
    //   return {
    //     pgName: page?.properties?.title?.title[0]?.text?.content,
    //     pgId: page?.id
    //   }
    // })

    // console.log("2 page Daat and id", pgData)
    let final = [];

    // const final = await pgData?.map(async (page) => {
    //   const searchHeaders2 = {
    //     'accept': 'application/json',
    //     'Notion-Version': '2022-06-28',
    //     'authorization': `Bearer ${accessToken}`,
    //   };

    //   const res3 = await fetch(`https://api.notion.com/v1/blocks/${page?.pgId}/children?page_size=100`, {
    //     method: 'GET',
    //     headers: searchHeaders2,
    //   });
    //   const data3 = await res3.json();

    //   const pgData = data3?.results?.filter(aa => aa?.type === "paragraph")?.map(aa => {
    //     if (aa?.paragraph?.text?.length < 0) {
    //       return aa?.paragraph?.text[0]?.text?.content
    //     }
    //   }
    //   )
    //   // console.log("Data 3 is ===========>" ,pgData)



    //   //block data array
    //   return {
    //     pgName: page?.pgName,
    //     pgData: data3
    //   }
    // }
    // )


// console.log("length check", pgData?.length) 



    // if(pgData?.length){
    //   console.log("intetrnal content loading" ,pgData)
    //   const searchHeaders2 =   {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': `Bearer ${accessToken}`,
    //         'Content-Type': 'application/json',
    //         'Notion-Version': notionVersion,
    //     }
    //   };

    //       const res3 = await fetch(`https://api.notion.com/v1/blocks/${pgData[0]?.pgId}/children?page_size=100`, {
    //         method: 'GET',
    //         headers: searchHeaders2,
    //       });
    //       const data3 = await res3.json();
    //       console.log("data 3 " , data3?.results[0])
    //       const pgContent = data3?.results?.filter(aa => aa?.type === "paragraph")?.map(aa => {
    //         if (aa?.paragraph?.text?.length < 0) {
    //           return aa?.paragraph?.text[0]?.text?.content
    //         }
    //       }
    //       )
    //       console.log("4 data 3 " , pgContent)
    //     }


    // console.log("5 FINAL data ", final);
    return Response.json({ data,final , accessToken });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'An error occurred' });
  }
}

