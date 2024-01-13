'use client';

import {
  Box, Button, Flex, Heading, Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer, Center, Text, Input, Textarea, Divider, Spinner, IconButton, useToast, Tabs, TabList, TabPanels, TabPanel, Tab, Avatar
} from '@chakra-ui/react'
import { getBlock } from '@notionhq/client/build/src/api-endpoints';
import { FaCheckCircle } from "react-icons/fa";

// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { RiNotionFill } from "react-icons/ri";

const TruncatedText = ({ text, maxChars }) => {
  const truncatedText = text.length > maxChars
    ? text.substring(0, maxChars) + "..."
    : text;

  return (
    <Text>
      {truncatedText}
    </Text>
  );
};

const NotionView = () => {
  const toast = useToast()
  const [text, setText] = useState("");
  const [pageData, setPageData] = useState([]);
  const [blockIds, setBlockIds] = useState([]);
  const [contentList, setContentList] = useState([]);
  const [accessToken, setAccessToken] = useState("")
  const [searchData, setSearchData] = useState({});
  const [localPgData, setLocalPgData] = useState([]);
  const [contentLoading, setContentLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userProfileUrl, setUserProfileUrl] = useState("");
  const [pageNameContentList, setPageNameContentList] = useState([]);
  const [tableData, setTableData] = useState([]);

  const handleChageText = (e) => {
    setText(e.target?.value)
  }
  const handleClickNotion = () => {
    window.location.href = `https://api.notion.com/v1/oauth/authorize?client_id=c11d73dd-6e07-4354-8cb6-230a73826598&response_type=code&owner=user&redirect_uri=${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL_REDIRECT}`
  }


  const getBlockNoFromPages = (pageId) => {

    const dataToSend = {
      pageId
    };

    // Convert the data to a JSON string
    const jsonData = JSON.stringify(dataToSend);

    const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL + '/fetchPagesData';

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
          // console.log("block ids --->", localBlockIds[i]?.id)
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
    const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL + '/getDatabase';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // // Handle the data received from the API
        // console.log("data is", data?.data?.results.map(res => {
        //   return {
        //     pageName: res?.properties?.Name?.title[0]?.text?.content,
        //     pageUrl: res?.public_url,
        //     id: res?.id
        //   }
        // }));
        let localPageData = data?.data?.results.map(res => {
          return {
            pageName: res?.properties?.Name?.title[0]?.text?.content,
            pageUrl: res?.public_url,
            id: res?.id
          }
        })
        //from pages get blocknos
        // console.log("length", localPageData)
        for (let i = 0; i < localPageData.length; i++) {
          // console.log("id is ", localPageData[i].id)
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
  const getBlockData = (blockId, accessToken, pageName) => {
    console.log("inside get block data", blockId, accessToken)
    const dataToSend = {
      blockId,
      accessToken
    };

    // Convert the data to a JSON string
    const jsonData = JSON.stringify(dataToSend);

    const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL + '/getBlockData';

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
        console.log("received after block ids getBlockData --->", data, data?.data.results?.filter(i => i?.type === "paragraph").map(aa =>
          aa?.paragraph?.rich_text[0]?.text?.content))

        setPageNameContentList(prev => [...prev, {
          name: pageName,
          content: data?.data.results?.filter(i => i?.type === "paragraph").map(aa =>
            aa?.paragraph?.rich_text[0]?.text?.content)
        }])
        // let ans = "";
        // data?.data?.results[0]?.paragraph?.rich_text?.forEach(res => {
        //   ans = ans + res?.plain_text;
        // })
        // console.log("local data", ans);
      })
      .catch(error => {
        // Handle errors during the fetch operation
        console.error('Error fetching data:', error);
      });
    setContentLoading(false);


  }
  useEffect(() => {
    ///get pages
    const getSearchData = (accessToken) => {

      const dataToSend = {
        accessToken
      };

      // Convert the data to a JSON string
      const jsonData = JSON.stringify(dataToSend);

      const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL + '/getSearchData';

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
          setTableData(data?.tableData)
          setSearchData(data?.resultData)

          console.log("table data--> ", data?.tableData)
          console.log("received token -->", data?.pgData?.length);
          if (data?.pgData?.length > 0) {
            let localPgD = data?.pgData;
            // setLocalPgData(data?.pgData?.filter(pg => pg?.name))
            console.log("before for loop ---> ", localPgD)
            for (let i = 0; i < localPgD?.length; i++) {
              console.log("before for loop ---> ", localPgD[i]?.pgId)
              if (localPgD[i]?.pgName) {
                getBlockData(localPgD[i]?.pgId, accessToken, localPgD[i]?.pgName)
              }
            }
          }

        })
        .catch(error => {
          // Handle errors during the fetch operation
          console.error('Error fetching data:', error);
        });
      setContentLoading(false)
    }
    const getAuthToken = (authCode) => {
      setContentLoading(true);
      const dataToSend = {
        authCode
      };

      // Convert the data to a JSON string
      const jsonData = JSON.stringify(dataToSend);

      const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL + '/getToken';

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
          if (data?.accessToken) {
            setUserName(data?.data?.owner?.user?.name);
            setUserProfileUrl(data?.data?.owner?.user?.avatar_url)
            setAccessToken(accessToken);
            getSearchData(data?.accessToken);
          } else {
            toast({
              description: `Token Expired Please Login to Notion again to see the content`,
              title: 'Error.',
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
            setContentLoading(false);
          }
          // if(data?.pgData?.length > 0 ){
          //   setLocalPgData(data?.pgData)
          //   setAccessToken(data?.accessToken)
          // }
          console.log("received token -->", data);

        })
        .catch(error => {
          // Handle errors during the fetch operation
          console.error('Error fetching data:', error);
        });
    }
    // getPagesFromDatabase();
    const redirectUrlResponse = window.location.href;
    const authCode = redirectUrlResponse?.split('code=')[1]?.split('&state=')[0];
    console.log(authCode)
    if (authCode && authCode?.length > 0) {
      getAuthToken(authCode)
    }
  }, [])

  // useEffect(()=>{

  //  localPgData?.filter(pg=> pg?.pgName).forEach(page=>getBlockData(page?.pgId , accessToken))
  // }, [localPgData])

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
        <Flex border={0} display={"flex"} direction="row" justifyContent={"center"} alignItems={"center"} borderColor={"#e5e7eb"} borderWidth={1} p={2} px={4} w={"100%"} >
          {pageNameContentList.length > 0 ? <><Text fontWeight={700} fontSize={"xl"}>Notion Connected</Text> &nbsp;  <FaCheckCircle color="green" /> </>
            : <><Text fontWeight={700} fontSize={"xl"}>Notion Not Connected</Text> &nbsp;  <FaCheckCircle color="darkgray" /> </>
          }
        </Flex>
        {
          pageNameContentList?.length > 0 ?  <Flex alignItems={"center"} direction={"row"} gap={3} justifyContent={"flex-start"}>
            <Avatar src={userProfileUrl} />
            <Text fontWeight={700}> {userName}</Text>
          </Flex>  : "" 
       }
        {
          contentLoading ? <Center> <Spinner /> </Center> : <Tabs>
            <TabList maxW={"100%"}>
              <Tab>Table Format</Tab>
              <Tab>JSON Format</Tab>
              <Tab>Normal Format</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TableContainer>
                  <Table overflow={"hidden"} variant='simple'>
                    <TableCaption>Data Fetched from Notion API</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Document Type</Th>
                        <Th>Document URL</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {tableData?.length > 0 ?
                        tableData?.map(table => (
                          <Tr>
                            <Td>    <TruncatedText text={table?.name} maxChars={20} /></Td>
                            <a href={table?.url} target='_blank'>   <Td color={"#6c28d9"}>
                              <TruncatedText text={table?.url} maxChars={55} /></Td></a>
                          </Tr>
                        ))

                        :
                        <Tr>
                          <Td>-</Td>
                          <Td>-</Td>
                        </Tr>}

                    </Tbody>
                  </Table>
                </TableContainer>

              </TabPanel>

              <TabPanel >
                {/* <Center> */}
                <Flex overflowX={"scroll"} textColor={"white"} fontWeight={600} bgColor={"#334155"}>
                  <pre style={{
                    overflowX: "scroll",
                    oveflow: "hidden"
                    , maxWidth: "30Vw"
                  }} >

                    {JSON.stringify(searchData, null, 2)}
                  </pre>
                </Flex>

              </TabPanel>
              <TabPanel>
                <Flex w={"100%"} borderColor={"#e5e7eb"} borderWidth={1} display={"flex"} gap={2} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>

                  {
                    pageNameContentList.map(page => (
                      <Flex direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} px={3}>
                        <Text fontWeight={"bold"}>
                          {page?.name}
                        </Text>
                        {page?.content.map(cnt => <Text>{cnt} </Text>)}
                      </Flex>
                    ))
                  }
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        }


      </Flex>
    </Flex>
  )
}

export default NotionView

// secret_fmBmClVvok3UJPbIcpGgvrw9sJwlw0cHLC3WGWmAhtU