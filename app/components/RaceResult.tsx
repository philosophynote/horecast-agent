import React from "react";
import type { RaceResponse } from "../api/race/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * 出馬表・予想結果表示用コンポーネント
 * @param data APIから取得したレース情報・予想結果
 */
export function RaceResult({ data }: { data: RaceResponse }) {
  const { race, predictions } = data;
  return (
    <section className="w-full max-w-2xl mx-auto mt-8">
      {/* 出馬表（レース概要＋馬一覧） */}
      <div className="mb-8 p-4 border rounded bg-gray-50">
        <h2 className="text-lg font-bold mb-2">{race.name}</h2>
        <div className="mb-2 text-sm text-gray-700">
          <span>{race.date}</span> ／ <span>{race.place}</span> ／ <span>{race.number}R</span> ／ <span>{race.surface}</span> ／ <span>{race.distance}m</span>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>枠</TableHead>
              <TableHead>馬</TableHead>
              <TableHead>馬名</TableHead>
              <TableHead>性齢</TableHead>
              <TableHead>騎手</TableHead>
              <TableHead>斤量</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {race.horses.map((h) => (
              <TableRow key={h.uma}>
                <TableCell className="text-center">{h.waku}</TableCell>
                <TableCell className="text-center">{h.uma}</TableCell>
                <TableCell>{h.name}</TableCell>
                <TableCell className="text-center">{h.sex}{h.age}</TableCell>
                <TableCell>{h.jockey}</TableCell>
                <TableCell className="text-center">{h.weight}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* 予想結果カード */}
      <div className="grid gap-4">
        {predictions.map((p, i) => (
          <a
            key={i}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="hover:bg-blue-50 transition">
              <CardHeader>
                <CardTitle className="text-base">{p.source}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-800 whitespace-pre-line">{p.content}</div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
} 