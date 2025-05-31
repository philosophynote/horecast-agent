import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { mcp } from '../mcp';

/**
 * Perplexity APIを利用したWeb検索ツールを使う競馬レース情報エージェント
 */
export const predictRaceAgent = new Agent({
  name: "predictRaceAgent",
  instructions: `あなたは競馬レース情報収集AIです。
    ユーザーから受け取ったレース情報（開催日・競馬場・レース番号）をもとに、
    predictWebSearchToolを使ってWeb検索し、

    1. 出馬表（レース概要・馬一覧）も構造化JSONではなく、**「出馬表として分かりやすい文章」**でまとめてください。
    2. 予想結果も構造化JSONにせず、**「予想内容・根拠・情報ソース」**を日本語で分かりやすくテキストでまとめてください。
      - 例:
      【予想】本命は3番サトノダイヤモンド。根拠: 前走内容が優秀...
      情報ソース: https://example.com/keiba-yosou
    3. それぞれ raceText, predictionText という2つのフィールドで、下記のJSON形式で返してください。
      {
        "raceText": "出馬表の文章",
        "predictionText": "予想内容・根拠・情報ソースを含むテキスト（複数の場合は改行区切り）"
      }
    - どちらも構造化せず、文章として返してください。
    - 余計な説明や補足は不要です。JSONのみを返してください。`,
  model: openai("o4-mini"),
  tools: await mcp.getTools(),
});

