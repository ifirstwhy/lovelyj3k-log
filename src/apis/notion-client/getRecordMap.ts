import { Client } from "@notionhq/client"
import { NotionToMarkdown } from "notion-to-md"

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const n2m = new NotionToMarkdown({ notionClient: notion })

function toDashedId(id: string): string {
  return id.replace(
    /^([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})$/,
    "$1-$2-$3-$4-$5"
  )
}

export const getRecordMap = async (pageId: string): Promise<string> => {
  const dashedId = toDashedId(pageId)
  const mdBlocks = await n2m.pageToMarkdown(dashedId)
  const mdString = n2m.toMarkdownString(mdBlocks)
  return mdString.parent
}
