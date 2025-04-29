import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { predictWebSearchTool } from "../tools/predict-web-search-tool";

/**
 * Perplexity APIを利用したWeb検索ツールを使う競馬レース情報エージェント
 */
export async function createRaceAgent() {
  return new Agent({
    name: "Race Info Agent",
    instructions: `あなたは競馬レース情報収集AIです。
ユーザーから受け取ったレース情報（開催日・競馬場・レース番号）をもとに、
predictWebSearchToolを使ってWeb検索し、
以下のTypeScript型（RaceResponse型）に完全に準拠したJSON形式で出力してください。

---
// 出馬表・馬情報型
export type Horse = {
  waku: number; // 枠番
  uma: number; // 馬番
  name: string; // 馬名
  sex: "牡" | "牝" | "セ"; // 性別
  age: number; // 馬齢
  jockey: string; // 騎手
  weight: number; // 負担重量
};
// レース概要型
export type RaceInfo = {
  name: string; // レース名
  date: string; // ISO8601
  place: string; // 競馬場名
  number: number; // レース番号
  surface: "芝" | "ダート" | "障害"; // 開催馬場
  distance: number; // レース距離
  horses: Horse[];
};
// 予想結果型
export type Prediction = {
  source: string; // 情報ソース名
  url: string;    // ソースURL
  content: string; // 予想内容
};
// APIレスポンス型
export type RaceResponse = {
  race: RaceInfo;
  predictions: Prediction[];
};
---

必ずJSONのみを返してください。説明や補足は一切不要です。`,
    model: openai("o4-mini"),
    tools: { predictWebSearchTool },
  });
} 