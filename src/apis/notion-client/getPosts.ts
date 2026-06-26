import { Client, isFullPage } from "@notionhq/client"
import { CONFIG } from "site.config"
import { TPosts, TPost } from "src/types"

const notion = new Client({ auth: process.env.NOTION_TOKEN })

function getTextValue(prop: any): string {
  if (!prop) return ""
  if (prop.type === "title") return prop.title?.map((t: any) => t.plain_text).join("") || ""
  if (prop.type === "rich_text") return prop.rich_text?.map((t: any) => t.plain_text).join("") || ""
  if (prop.type === "url") return prop.url || ""
  return ""
}

function getSelectValue(prop: any): string[] {
  if (!prop) return []
  if (prop.type === "select" && prop.select) return [prop.select.name]
  if (prop.type === "multi_select") return prop.multi_select?.map((s: any) => s.name) || []
  return []
}

function getDateValue(prop: any): { start_date: string } | null {
  if (!prop || prop.type !== "date" || !prop.date) return null
  return { start_date: prop.date.start }
}

function getFileValue(prop: any): string | undefined {
  if (!prop || prop.type !== "files") return undefined
  const files = prop.files || []
  if (!files.length) return undefined
  const file = files[0]
  return file.type === "external" ? file.external?.url : file.file?.url
}

export const getPosts = async (): Promise<TPosts> => {
  const databaseId = CONFIG.notionConfig.pageId as string
  const posts: TPost[] = []
  let cursor: string | undefined

  do {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
      page_size: 100,
    })

    for (const page of response.results) {
      if (!isFullPage(page)) continue
      const props = page.properties as any

      const title = getTextValue(props.title || props.Title || props.Name)
      if (!title) continue

      posts.push({
        id: page.id.replace(/-/g, ""),
        title,
        slug: getTextValue(props.slug || props.Slug),
        date: getDateValue(props.date || props.Date) as { start_date: string },
        type: getSelectValue(props.type || props.Type) as any,
        status: getSelectValue(props.status || props.Status) as any,
        tags: getSelectValue(props.tags || props.Tags),
        category: getSelectValue(props.category || props.Category),
        summary: getTextValue(props.summary || props.Summary),
        thumbnail: getFileValue(props.thumbnail || props.Thumbnail),
        createdTime: new Date((page as any).created_time).toString(),
        fullWidth: false,
        author: [],
      })
    }

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
  } while (cursor)

  posts.sort((a, b) => {
    const dateA = new Date(a.date?.start_date || a.createdTime).getTime()
    const dateB = new Date(b.date?.start_date || b.createdTime).getTime()
    return dateB - dateA
  })

  return posts
}
