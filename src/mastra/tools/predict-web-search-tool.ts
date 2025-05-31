import { createTool } from "@mastra/core/tools";
import { z } from "zod";

/**
 * Perplexity APIを利用した汎用Web検索ツール
 */
export const predictWebSearchTool = createTool({
  id: "predict-web-search-tool",
  description: "任意のクエリでPerplexity APIを使ってWeb検索・要約を行うツール",
  inputSchema: z.object({
    query: z.string().describe("Web検索したい内容・質問")
  }),
  outputSchema: z.object({
    summary: z.string(),
    raw: z.any().optional(),
  }),
  execute: async ({ context: { query } }) => {
    const apiKey = process.env.PERPLEXITY_API_KEY;
    if (!apiKey) throw new Error("Perplexity APIのAPIキーが設定されていません（PERPLEXITY_API_KEY）");
    const endpoint = "https://api.perplexity.ai/chat/completions";
    const body = {
      model: "sonar-pro", // Web検索対応モデル
      messages: [
        { role: "system", content: "あなたはWeb検索を行い、要点を日本語で簡潔にまとめて返すアシスタントです。" },
        { role: "user", content: `${query} についてWeb検索し、要点を日本語でまとめてください。` }
      ]
    };
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });
    console.log(res);
    if (!res.ok) throw new Error("Perplexity APIリクエストに失敗しました");
    const data = await res.json();
    // Perplexityのレスポンスから要約を抽出
    console.log(data);
    const summary = data.choices?.[0]?.message?.content || "";
    console.log(`${query}の要約: ${summary}`);
    return {
      summary,
      raw: data
    };
  }
}); 