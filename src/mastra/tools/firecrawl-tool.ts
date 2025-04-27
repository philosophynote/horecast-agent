import { createTool } from "@mastra/core/tools";
import { z } from "zod";

/**
 * FireCrawl MCPサーバーを利用してWeb検索・情報抽出を行うツール
 */
export const firecrawlTool = createTool({
  id: "firecrawl-web-search",
  description: "FireCrawl MCPサーバーでWeb検索・情報抽出を行う",
  inputSchema: z.object({
    query: z.string().describe("検索クエリ（例: 2024年6月2日 東京11R 安田記念 出馬表 予想")
  }),
  outputSchema: z.object({
    results: z.array(z.object({
      url: z.string(),
      title: z.string(),
      content: z.string().optional(),
    }))
  }),
  execute: async (input: any) => {
    console.log(input);
    console.log(input["context"]);
    console.log(input["context"]["query"]);
    const query = input["context"]["query"];
    if (!query) throw new Error("検索クエリが指定されていません");
    // FireCrawl MCPサーバーのREST APIを呼び出す
    const res = await fetch("http://localhost:4111/api/tools/firecrawl/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });
    if (!res.ok) throw new Error("FireCrawl検索に失敗しました");
    const data = await res.json();
    // FireCrawlのレスポンスを整形
    return {
      results: (data.results || []).map((r: any) => ({
        url: r.url,
        title: r.title,
        content: r.content || ""
      }))
    };
  }
}); 