import { Box, Button, Flex, Heading, Center, Text, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

const TextView = () => {
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

        <Flex w={"100%"} borderColor={"#e5e7eb"} borderWidth={1} display={"flex"} gap={2} flexDirection={"column"} justifyContent={"flex-start"} alignItems={"flex-start"}>
          <Flex display={"flex"} direction="row" justifyContent={"flex-start"} borderColor={"#e5e7eb"} borderWidth={1} p={2} px={4} w={"100%"} >
            <Text fontWeight={700} fontSize={"xl"}>Text</Text>
          </Flex>
          <Flex px={3} py={4} w={"100%"} direction={"column"} gap={3}  >
            <Flex px={3} py={4} w={"100%"} direction={"column"} gap={3} borderColor={"#e5e7eb"} borderWidth={1} h={40}>
              <Input as="textarea" value={text} onChange={handleChageText} color={"#6c28d9"} outlineColor={"#6c28d9"} outline={"none"} border={"none"} type="textarea" fontSize={"sm"} fontWeight={"light"} placeholder='data' />

            </Flex>
          </Flex>
          <Flex direction={"row"} w={"100%"} pb={3} justifyContent={"center"} alignItems={"center"}>
            <Center>     <Text color={"#52525b"} fontSize={"sm"}>  {text?.length} characters</Text></Center>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default TextView