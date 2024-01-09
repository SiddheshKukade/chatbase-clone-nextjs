import { Box, Button, Flex, Heading, Center, Text, Input, Icon, IconButton, Divider } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdOutlineFileUpload } from "react-icons/md";

const Files = () => {
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
            <Text fontWeight={700} fontSize={"xl"}>Files</Text>
          </Flex>
          <Flex px={3} py={4} w={"100%"} direction={"column"} gap={3}  >
            <Flex px={3} py={4} w={"100%"} direction={"column"} gap={3} borderColor={"#e5e7eb"} borderWidth={1} h={80} alignItems={"center"} justifyContent={"center"}>
              <Flex direction={"column"} alignItems={"center"} justifyContent={"center"}>
                <IconButton background={"transparent"} icon={<MdOutlineFileUpload />} />
                <Text fontWeight={500} borderColor={"#52525b"}  > Drag & drop files here, or click to select files</Text>

                <Text fontWeight={"light"} fontSize={"small"} >
                  Supported File Types: .pdf, .doc, .docx, .txt</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex direction={"row"} w={"100%"} pb={3} justifyContent={"center"} alignItems={"center"}>
            <Center>   <Text fontWeight={"light"} fontSize={"sm"} >
              If you are uploading a PDF, make sure you can select/highlight the text.
            </Text></Center>
          </Flex>
          <Flex>
        </Flex>
        </Flex>
       
      </Flex>
    </Flex >
  )
}

export default Files