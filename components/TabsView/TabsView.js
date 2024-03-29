import React from 'react'
import {
    Tabs, TabList, TabPanels, Tab, TabPanel, Center, Tag,
    TagLabel,
} from '@chakra-ui/react'
import SourcesPage from '../Sources/SourcesPage'

const TabsView = () => {
    return (
        <Tabs defaultIndex={3} colorScheme={"#6c28d9"} w={"100%"}>
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


            <TabPanels>
                <TabPanel>
                    <p>Go To Sources</p>
                </TabPanel>
                <TabPanel>
                    <p>Go To Sources</p>
                </TabPanel>
                <TabPanel>
                    <p>Go To Sources</p>
                </TabPanel>
                <TabPanel>
                    <SourcesPage />
                </TabPanel>
                <TabPanel>
                    <p>Go To Sources</p>
                </TabPanel>
                <TabPanel>
                    <p>Go To Sources</p>
                </TabPanel>
                <TabPanel>
                    <p>Go To Sources</p>
                </TabPanel>
                <TabPanel>
                    <p>Go To Sources</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default TabsView