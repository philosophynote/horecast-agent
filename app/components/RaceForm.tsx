"use client"

import { useState } from "react";

/**
 * レース情報入力フォームのデータ型
 */
export type RaceFormData = {
  date: string;
  place: "東京" | "京都" | "福島";
  number: number;
};

/**
 * 競馬レース情報入力フォーム
 * - 開催日、競馬場、レース番号を入力
 */
export function RaceForm({ onSubmit }: { onSubmit: (data: RaceFormData) => void }) {
  // 入力値の状態管理
  const [form, setForm] = useState<RaceFormData>({
    date: "",
    place: "東京",
    number: 1,
  });

  // 入力変更ハンドラ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "number" ? Number(value) : value,
    }));
  };

  // 送信ハンドラ
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md p-4 border rounded bg-white shadow">
      <label className="flex flex-col gap-1">
        開催日
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="border rounded px-2 py-1"
        />
      </label>
      <label className="flex flex-col gap-1">
        競馬場
        <select
          name="place"
          value={form.place}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        >
          <option value="東京">東京</option>
          <option value="京都">京都</option>
          <option value="福島">福島</option>
        </select>
      </label>
      <label className="flex flex-col gap-1">
        レース番号
        <select
          name="number"
          value={form.number}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </label>
      <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition">検索</button>
    </form>
  );
} 