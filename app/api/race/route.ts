import { NextResponse } from "next/server";
import { mastra } from "@/mastra";

/**
 * POST /api/race
 * レース情報を受け取り、予想結果を返すAPI
 */
export async function POST(req: Request) {
  // リクエストボディのパース
  const body = await req.json();

  // 型バリデーション
  if (!body || typeof body.date !== "string" || typeof body.raceName !== "string") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { date, raceName } = body;

  // プロンプト整形
  const prompt = `開催日: ${date}\nレース名: ${raceName}\nこのレースの出馬表とWEB上の予想をまとめてください。`;

  // predictRaceAgentで情報取得
  const agent = mastra.getAgent("predictRaceAgent");
  const result = await agent.generate(prompt);

  // そのまま返却
  return NextResponse.json({ text: result.text });
} 