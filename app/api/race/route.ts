import { NextResponse } from "next/server";
import { RaceRequest, RaceResponse } from "./types";

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

  // TODO: Mastraエージェントで情報取得
  // ここではダミーデータを返す
  const dummy: RaceResponse = {
    race: {
      name: "第70回 安田記念(G1)",
      date: "2024-06-02T15:40:00+09:00",
      place: reqData.place,
      number: reqData.number,
      surface: "芝",
      distance: 1600,
      horses: [
        {
          waku: 1,
          uma: 1,
          name: "ソングライン",
          sex: "牝",
          age: 5,
          jockey: "戸崎圭太",
          weight: 56.0,
        },
        // ...他の馬（省略）
      ],
    },
    predictions: [
      {
        source: "netkeiba.com",
        url: "https://www.netkeiba.com/",
        content: "◎ソングライン ○セリフォス ▲シュネルマイスター",
      },
      {
        source: "スポーツ新聞A",
        url: "https://example.com/",
        content: "◎シュネルマイスター ○ソングライン",
      },
    ],
  };

  return NextResponse.json(dummy);
} 