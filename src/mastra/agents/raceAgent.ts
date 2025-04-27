import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { firecrawlTool } from "../tools/firecrawl-tool";

/**
 * 競馬レース情報（出馬表・予想）をWeb検索で収集するエージェント
 */
export const raceAgent = new Agent({
  name: "Race Info Agent",
  instructions: `あなたは競馬レース情報収集AIです。
ユーザーから受け取ったレース情報（開催日・競馬場・レース番号）をもとに、
FireCrawlツールを使ってWeb検索し、
・レースの出馬表（レース名、開催日時、競馬場名、レース番号、馬場、距離、出走馬一覧）
・WEB上で公開されている予想（予想内容、情報ソースURL）
を日本語で簡潔にまとめて返してください。
` ,
  model: openai("o4-mini"),
  tools: { firecrawlTool },
}); 