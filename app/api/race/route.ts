import { NextResponse } from "next/server";
import { RaceRequest } from "./types";
import { mastra } from "@/mastra";

/**
 * POST /api/race
 * レース情報を受け取り、出馬表・予想結果を返すAPI
 */
export async function POST(req: Request) {
  // リクエストボディのパース
  const body = await req.json();

  // 型バリデーション（簡易）
  if (!body || typeof body.date !== "string" || !["東京", "京都", "福島"].includes(body.place) || typeof body.number !== "number") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const reqData: RaceRequest = body;

  // レース情報をプロンプトとして整形
  const prompt = `開催日: ${reqData.date}\n競馬場: ${reqData.place}\nレース番号: ${reqData.number}\nこのレースの出馬表とWEB上の予想をまとめてください。`;

  // Mastraエージェントで情報取得
  const agent = mastra.getAgent("raceAgent");
  const result = await agent.generate(prompt);

  // そのまま返す（AIの出力をフロントでパースする前提）
  return NextResponse.json({ result: result.text });
} 