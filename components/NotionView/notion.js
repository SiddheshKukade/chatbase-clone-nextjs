import "server-only";

import { Client } from "@notionhq/client";
import React from "react";
import {
    BlockObjectResponse,
    PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({
    auth: "secret_fmBmClVvok3UJPbIcpGgvrw9sJwlw0cHLC3WGWmAhtU",
});

export const fetchPages = React.cache(() => {
    return notion.databases.query({
        database_id: "775552e7f0cb490da007ea5efeb9291b?v=d8564b05acdb451fa8d2798667e68529",
        filter: {
            property: "Status",
            select: {
                equals: "Published",
            },
        },
    });
});

export const fetchPageBySlug = React.cache((slug) => {
    return notion.databases
        .query({
            database_id: "775552e7f0cb490da007ea5efeb9291b?v=d8564b05acdb451fa8d2798667e68529",
            filter: {
                property: "Slug",
                rich_text: {
                    equals: slug,
                },
            },
        })
        .then((res) => res.results[0]);
});

export const fetchPageBlocks = React.cache((pageId) => {
    return notion.blocks.children
        .list({ block_id: pageId })
        .then((res) => res.results);
});