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

  // AIの出力をRaceResponse型としてパース・バリデーション
  let raceResponse;
  try {
    raceResponse = JSON.parse(result.text);
    // RaceResponse型の簡易バリデーション
    if (!raceResponse.race || !raceResponse.predictions) throw new Error();
    const r = raceResponse.race;
    if (
      typeof r.name !== "string" ||
      typeof r.date !== "string" ||
      typeof r.place !== "string" ||
      typeof r.number !== "number" ||
      !["芝", "ダート", "障害"].includes(r.surface) ||
      typeof r.distance !== "number" ||
      !Array.isArray(r.horses) ||
      !Array.isArray(raceResponse.predictions)
    ) {
      throw new Error();
    }
  } catch (e) {
    return NextResponse.json({ error: "AI出力のパースまたは型バリデーションに失敗しました" }, { status: 400 });
  }

  return NextResponse.json(raceResponse);
} 