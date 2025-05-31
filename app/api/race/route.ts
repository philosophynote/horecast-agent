import { NextResponse } from "next/server";
import { RaceRequest } from "./types";
import { mastraPromise } from "@/mastra";

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
  const mastra = await mastraPromise;
  const agent = mastra.getAgent("raceAgent");
  const result = await agent.generate(prompt);

  // Agentが出力した文章（raceText, predictionText）をそのまま返却
  let response;
  try {
    response = JSON.parse(result.text);
  } catch (e) {
    return NextResponse.json({ error: "AI出力のパースに失敗しました", raw: result.text }, { status: 400 });
  }
  return NextResponse.json({ raceText: response.raceText, predictionText: response.predictionText });
} 