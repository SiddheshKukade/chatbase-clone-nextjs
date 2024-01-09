import { Box, Button, Flex, Heading, Center, Text, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

const Website = () => {
  const [text, setText] = useState("");

  const handleChageText = (e) => {
    setText(e.target?.value)
  }
  return (
    <Flex w="100%" p={5}>
      <Flex w={"100%"} direction={"column"} gap={2}  >
        <Heading userSelect={"none"} as='h3' size='lg' color={"white"}>
          Heading
        </Heading>

        <Flex w={"100%"} borderColor={"#e5e7eb"} borderWidth={1} display={"flex"} gap={2} flexDirection={"column"} justifyContent={"flex-start"} alignItems={"flex-start"}>
          <Flex display={"flex"} direction="row" justifyContent={"flex-start"} borderColor={"#e5e7eb"} borderWidth={1} p={2} px={4} w={"100%"} >
            <Text fontWeight={700} fontSize={"xl"}>Website</Text>
          </Flex>
          <Flex px={3} py={4} w={"100%"} direction={"column"} gap={3}  >
            <Flex px={3} py={4} w={"100%"} direction={"column"} gap={3} h={40}>
              <Text>
                Crawl
              </Text>
              <Flex gap={2}>
                <Input placeholder='https://example.com/' /> <Button background={'#18181b'} color={"white"}>Fetch Links</Button>
              </Flex>
              <Text fontSize={"sm"} color={"#52525b"}> This will crawl all the links starting with the URL (not including files on the website).</Text>
            </Flex>
          </Flex>
          <Flex w={"100%"} direction={"row"} justifyContent={"center"}>
            <Text fontWeight={600} fontSize={"xl"}>OR</Text>
          </Flex>
          <Flex px={3}  w={"100%"} direction={"column"} gap={3}  >
            <Flex px={3}  w={"100%"} direction={"column"} gap={3} h={40}>
              <Text>
                Submit Sitemap
              </Text>
              <Flex gap={2}>
                <Input placeholder='https://example.com/sitemap.xml' /> <Button background={'#18181b'} color={"white"}>Load Sitemap</Button>
              </Flex>
              
            </Flex>
          </Flex>
          <Flex w={"100%"} direction={"row"} justifyContent={"center"} py={3}>
            <Text fontWeight={600} fontSize={"lg"} pb={4}>Included Links</Text>
          </Flex>
       
        </Flex>
        
      </Flex>
    </Flex>
  )
}

export default Website