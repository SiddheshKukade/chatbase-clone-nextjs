"use client"
import { Box, Button, Card, CardBody, Flex, Heading, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, VStack, Text, Center } from '@chakra-ui/react'
import React, { useState } from 'react';
import { RiNotionFill } from "react-icons/ri";
import { LuText } from "react-icons/lu";
import { VscCommentDiscussion } from "react-icons/vsc";
import { CiFileOn } from "react-icons/ci"; import { HiOutlineGlobeAlt } from "react-icons/hi2";
import Files from '../Files/Files';
import NotionView from '../NotionView/NotionView';
import QA from '../QA/QA';
import Website from '../Website/Website';
import TextView from '../Text/Text';
const SourcesPage = () => {
    const [selectedBtn, setSelectedBtn] = useState("Notion")
    const handleUpdateMenu = (val) => {
        console.log("first", val)
        setSelectedBtn(val);
    }

    const loadMenuComponent = (selectedBtn) => {
        switch (selectedBtn) {
            case "Files":
                return <Files/>
            case "Text":
                return <TextView/>
                case "Website":
                return <Website/>
                case "Q&A":
                return <QA/>
                case "Notion":
                return <NotionView/>
            default:
                return <p>Noting here !</p>;
        }
    }
    return (
        <Flex direction="row" justifyContent={"space-between"} pt={15} px={85}>
            <Flex direction={"column"} gap={10} >
                <Heading as='h3' size='lg'>
                    Sources
                </Heading>

                <VStack display={"flex"} flexDirection={"column"} justifyContent={"flex-statr"} alignItems={"center"}>
                    <Button onClick={() => handleUpdateMenu("Files")} backgroundColor={selectedBtn === "Files" ? "#f3f3f3" : ""} color={selectedBtn === "Files" ? "#6c28d9" : "#52525b"} pr={10} display={"flex"} flexDirection={"row"} justifyContent={"flex-statr"} alignItems={"center"} variant={"ghost"} leftIcon={<CiFileOn  />} w="100%">
                        Files
                    </Button>
                    <Button onClick={() => handleUpdateMenu("Text")} backgroundColor={selectedBtn === "Text" ? "#f3f3f3" : ""} color={selectedBtn === "Text" ? "#6c28d9" : "#52525b"} pr={10} display={"flex"} flexDirection={"row"} justifyContent={"flex-statr"} alignItems={"center"} variant={"ghost"} leftIcon={<LuText />} w="100%">
                        Text
                    </Button>
                    <Button onClick={() => handleUpdateMenu("Website")} backgroundColor={selectedBtn === "Website" ? "#f3f3f3" : ""} color={selectedBtn === "Website" ? "#6c28d9" : "#52525b"} pr={10} display={"flex"} flexDirection={"row"} justifyContent={"flex-statr"} alignItems={"center"} variant={"ghost"} leftIcon={<HiOutlineGlobeAlt />} w="100%">
                        Website
                    </Button>
                    <Button onClick={() => handleUpdateMenu("Q&A")} backgroundColor={selectedBtn === "Q&A" ? "#f3f3f3" : ""} color={selectedBtn === "Q&A" ? "#6c28d9" : "#52525b"} pr={10} display={"flex"} flexDirection={"row"} justifyContent={"flex-statr"} alignItems={"center"} variant={"ghost"} leftIcon={<VscCommentDiscussion />} w="100%">
                        Q&A
                    </Button>
                    <Button onClick={() => handleUpdateMenu("Notion")} backgroundColor={selectedBtn === "Notion" ? "#f3f3f3" : ""} color={selectedBtn === "Notion" ? "#6c28d9" : "#52525b"} pr={10} display={"flex"} flexDirection={"row"} justifyContent={"flex-statr"} alignItems={"center"} variant={"ghost"} leftIcon={<RiNotionFill />} w="100%">
                        Notion
                    </Button>
                </VStack>
            </Flex>

                {loadMenuComponent(selectedBtn)}
            <Flex w="30%">
                <Flex w={"100%"} direction={"column"} gap={10} >
                    <Heading userSelect={"none"} as='h3' size='lg' color={"white"}>
                        Heading
                    </Heading>

                    <Flex w={"100%"} px={3} py={4} borderColor={"#e5e7eb"} borderWidth={1} display={"flex"} gap={3} flexDirection={"column"} justifyContent={"flex-statr"} alignItems={"center"}>
                        <Text fontSize={"md"} fontWeight={500}>
                            Sources
                        </Text>

                        <Flex w={"100%"} direction={"column"} gap={3}>
                            <Text fontSize={"sm"} fontWeight={"light"}> 1 File (4403 Chars)</Text>
                            <Box>
                                <Text fontSize={"sm"} fontWeight={"bold"}>Total detected characters </Text>
                                <Center>
                                    <Text fontSize={"sm"} fontWeight={"bold"}>4,403</Text> / <Text fontSize={"small"} fontWeight={"light"}>400,000 limit</Text>
                                </Center>
                            </Box>
                            <Button w={"100%"} background={'#18181b'} color={"white"}>
                                Retrain Chatbot
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex >
    )
}

export default SourcesPage