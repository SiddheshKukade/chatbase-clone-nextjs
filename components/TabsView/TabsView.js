import React from 'react'
import {
    Tabs, TabList, TabPanels, Tab, TabPanel, Center, Tag,
    TagLabel,
} from '@chakra-ui/react'
import SourcesPage from '../Sources/SourcesPage'

const TabsView = () => {
    return (
        <Tabs colorScheme={"#6c28d9"} w={"100%"}>
            {/* <Center> */}
            <TabList w={"100vw"} display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                <Tab>Chatbot</Tab>
                <Tab>Settings</Tab>
                <Tab>Dashboard</Tab>
                <Tab defaultChecked={true}>Sources</Tab>
                <Tab>Integrations &nbsp;
                    <Tag size={"sm"} variant='subtle' color='#6c28d9'>
                        <TagLabel>New</TagLabel>
                    </Tag>

                </Tab>
                <Tab>Embed on site</Tab>
                <Tab>Share</Tab>
                <Tab>Delete</Tab>

            </TabList>
            {/* </Center> */}


            <TabPanels>
                <TabPanel>
                    <p>one!</p>
                </TabPanel>
                <TabPanel>
                    <p>two!</p>
                </TabPanel>
                <TabPanel>
                    <p>three!</p>
                </TabPanel>
                <TabPanel>
                    <SourcesPage />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default TabsView