'use client';

import { Box, Button, Flex, Heading, Center, Text, Input, Textarea, Divider, Spinner } from '@chakra-ui/react'
// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { RiNotionFill } from "react-icons/ri";
const NotionView = () => {
  const [text, setText] = useState("");
  const [pageData, setPageData] = useState([]);
  const [blockIds, setBlockIds] = useState([]);
  const [contentList, setContentList] = useState([]);
  const [contentLoading, setContentLoading] = useState(false);
  const handleChageText = (e) => {
    setText(e.target?.value)
  }

  // const url = 'https://api.notion.com/v1/blocks/32eab06a2aa34e13abde011ec51fc89d/children?page_size=100';
  // const token = 'Bearer secret_fmBmClVvok3UJPbIcpGgvrw9sJwlw0cHLC3WGWmAhtU';

  // fetch(url, {
  //   method: 'GET',
  //   headers: {
  //     'Authorization': token,
  //     'Content-Type': 'application/json',
  //   },
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     // Handle the response data here
  //     console.log(data);
  //   })
  //   .catch(error => {
  //     // Handle any errors that occurred during the fetch
  //     console.error('Error:', error);
  //   });
  // const router = useRouter();
  const handleClickNotion = () => {
    window.location.href = "https://api.notion.com/v1/oauth/authorize?client_id=c11d73dd-6e07-4354-8cb6-230a73826598&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F"
  }

  const getBlockData = (blockId) => {

    const dataToSend = {
      blockId
    };

    // Convert the data to a JSON string
    const jsonData = JSON.stringify(dataToSend);

    const apiUrl = 'http://localhost:3000/api/getBlockData';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
      .then(data => {
        console.log("received after block ids --->", data)
        let ans = "";
        data?.data?.results[0]?.paragraph?.rich_text?.forEach(res => {
          ans = ans + res?.plain_text;
        })
        console.log("local data", ans);
        setContentList(prev => [...prev, ans]);

      })
      .catch(error => {
        // Handle errors during the fetch operation
        console.error('Error fetching data:', error);
      });
    setContentLoading(false);


  }
  const getBlockNoFromPages = (pageId) => {

    const dataToSend = {
      pageId
    };

    // Convert the data to a JSON string
    const jsonData = JSON.stringify(dataToSend);

    const apiUrl = 'http://localhost:3000/api/fetchPagesData';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
      .then(data => {
        // Handle the data received from the API

        let localBlockIds = data?.data?.results.map(res => {
          return {
            id: res?.id
          }
        });
        for (let i = 0; i < localBlockIds.length; i++) {
          console.log("block ids --->", localBlockIds[i]?.id)
          getBlockData(localBlockIds[i]?.id)
        }
        setBlockIds(prev => [...prev, data?.data?.results.map(res => {
          return {
            id: res?.id
          }
        })]);

      })
      .catch(error => {
        // Handle errors during the fetch operation
        console.error('Error fetching data:', error);
      });

  }
  const getPagesFromDatabase = () => {
    setContentLoading(true);
    const apiUrl = 'http://localhost:3000/api/getDatabase';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Handle the data received from the API
        console.log("data is", data?.data?.results.map(res => {
          return {
            pageName: res?.properties?.Name?.title[0]?.text?.content,
            pageUrl: res?.public_url,
            id: res?.id
          }
        }));
        let localPageData = data?.data?.results.map(res => {
          return {
            pageName: res?.properties?.Name?.title[0]?.text?.content,
            pageUrl: res?.public_url,
            id: res?.id
          }
        })
        //from pages get blocknos
        console.log("length", localPageData)
        for (let i = 0; i < localPageData.length; i++) {
          console.log("id is ", localPageData[i].id)
          getBlockNoFromPages(localPageData[i].id);

        }
        setPageData(
          data?.data?.results.map(res => {
            return {
              pageName: res?.properties?.Name?.title[0]?.text?.content,
              pageUrl: res?.public_url,
              id: res?.id
            }
          })
        )
      })
      .catch(error => {
        // Handle errors during the fetch operation
        console.error('Error fetching data:', error);
      });

  }

  useEffect(() => {
    ///get pages

    getPagesFromDatabase();

  }, [])

  console.log("contentList", contentList)
  return (
    <Flex w="100%" p={5}>
      <Flex w={"100%"} direction={"column"} gap={5}  >
        <Heading userSelect={"none"} as='h3' size='lg' color={"white"}>
          Heading
        </Heading>

        <Flex w={"100%"} borderColor={"#e5e7eb"} borderWidth={1} display={"flex"} gap={2} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
          <Flex display={"flex"} direction="row" justifyContent={"flex-start"} borderColor={"#e5e7eb"} borderWidth={1} p={2} px={4} w={"100%"} >
            <Text fontWeight={700} fontSize={"xl"}>Notion</Text>
          </Flex>
          {/* <Flex px={3} py={4}  direction={"column"} gap={3} justifyContent={"flex-end"}  > */}
          <Box
            display={"flex"} dir="row"
            gap={2} boxShadow="md"
            m={3}
          >
            <Button onClick={handleClickNotion} background={"transparent"}>

              <RiNotionFill />  Connect Notion
            </Button> </Box>
          {/* </Flex> */}
          <Flex direction={"row"} w={"100%"} pb={3} justifyContent={"center"} alignItems={"center"}>
          </Flex>
        </Flex>
        {
          contentLoading ? <Center> <Spinner /> </Center> : <Flex w={"100%"} borderColor={"#e5e7eb"} borderWidth={1} display={"flex"} gap={2} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <Flex display={"flex"} direction="row" justifyContent={"flex-start"} borderColor={"#e5e7eb"} borderWidth={1} p={2} px={4} w={"100%"} >
              <Text fontWeight={700} fontSize={"xl"}>Pages</Text>
            </Flex>
            <Heading>
              Pages Names
            </Heading>
            {
              pageData.map(pg => <Flex w={"100%"} p={3} direction={"column"} justifyContent={"flex-start"} >
                <Text>{pg?.pageName}</Text>
              </Flex>
              )
            }
            <Heading>
              Pages Content
            </Heading>
            {contentList.map(ct =>
              <Flex direction={"column"} justifyContent={"flex-start"} p={3} gap={3}>
                <Text>
                  {ct}
                </Text>
                <Divider />
              </Flex>

            )}
          </Flex>
        }

      </Flex>
    </Flex>
  )
}

export default NotionView

// secret_fmBmClVvok3UJPbIcpGgvrw9sJwlw0cHLC3WGWmAhtU