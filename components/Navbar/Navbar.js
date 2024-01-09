import {
    Image, Flex, Button, HStack, Box, Text, Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from '@chakra-ui/react';
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
const CTA = "Get Started"
const data = [{ label: "Help" }, { label: "Account" }]

export default function Navbar() {
    return (
        <Flex
            w="100%"
            px="6"
            py="5"
            align="center"
            justify="space-between"
        >
            <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"center"} gap={2}>
               
                <Breadcrumb>
                <BreadcrumbItem>
                <Image borderRadius={10}  src={"https://www.chatbase.co/images/chatbase-logo.svg"} h="35px" />
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='#'>Chatbots</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem >
                        <BreadcrumbLink href='#' >
                            <Text fontWeight={500} fontStyle={"bold"}>
                                SIDDHESH_KUKADE_RESUME.pdf
                            </Text>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Box>

            <HStack as="nav" spacing="5" textColor={"#52525b"}>
                <Button variant="nav"  > Help</Button>
                <Button variant="nav" rightIcon={<FaArrowRightLong />}> Account</Button>
            </HStack>

        </Flex>
    );
}