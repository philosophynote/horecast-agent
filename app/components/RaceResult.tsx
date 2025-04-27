import React from "react";

/**
 * 出馬表・予想結果表示用コンポーネント（雛形）
 */
export function RaceResult() {
  return (
    <section className="w-full max-w-2xl mx-auto mt-8">
      {/* 出馬表（レース概要＋馬一覧） */}
      <div className="mb-8 p-4 border rounded bg-gray-50">
        <h2 className="text-lg font-bold mb-2">出馬表（ダミー）</h2>
        <p>ここにレース概要と出走馬一覧が表示されます。</p>
      </div>
      {/* 予想結果カード */}
      <div className="grid gap-4">
        <div className="p-4 border rounded bg-white shadow">
          <h3 className="font-semibold">予想カード（ダミー）</h3>
          <p>ここに予想内容が表示されます。</p>
        </div>
      </div>
    </section>
  );
} 