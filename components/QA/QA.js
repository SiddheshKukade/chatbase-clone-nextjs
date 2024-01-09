import { Box, Button, Flex, Heading, Center, Text, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

const QA = () => {
  const [text, setText] = useState("");

  const handleChageText = (e) => {
    setText(e.target?.value)
  }
  return (
    <Flex w="100%" p={5}>
      <Flex w={"100%"} direction={"column"} gap={5}  >
        <Heading userSelect={"none"} as='h3' size='lg' color={"white"}>
          Heading
        </Heading>

        <Flex w={"100%"} borderColor={"#e5e7eb"} borderWidth={1} display={"flex"} gap={2} flexDirection={"column"} justifyContent={"flex-end"} alignItems={"flex-end"}>
          <Flex display={"flex"} direction="row" justifyContent={"flex-start"} borderColor={"#e5e7eb"} borderWidth={1} p={2} px={4} w={"100%"} >
            <Text fontWeight={700} fontSize={"xl"}>Q&A</Text>
          </Flex>
          {/* <Flex px={3} py={4}  direction={"column"} gap={3} justifyContent={"flex-end"}  > */}
            <Button m={3}>
              Add
            </Button>
          {/* </Flex> */}
          <Flex direction={"row"} w={"100%"} pb={3} justifyContent={"center"} alignItems={"center"}>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default QA