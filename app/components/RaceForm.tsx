"use client"

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

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
  const form = useForm<RaceFormData>({
    defaultValues: {
      date: "",
      place: "東京",
      number: 1,
    },
    mode: "onBlur",
  });

  const handleSubmit = (data: RaceFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4 w-full max-w-md p-4 border rounded bg-white shadow">
        <FormField
          name="date"
          rules={{ required: "開催日を入力してください" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>開催日</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="place"
          rules={{ required: "競馬場を選択してください" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>競馬場</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="競馬場を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="東京">東京</SelectItem>
                    <SelectItem value="京都">京都</SelectItem>
                    <SelectItem value="福島">福島</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="number"
          rules={{ required: "レース番号を選択してください" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>レース番号</FormLabel>
              <FormControl>
                <Select value={String(field.value)} onValueChange={v => field.onChange(Number(v))}>
                  <SelectTrigger>
                    <SelectValue placeholder="レース番号を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i + 1} value={String(i + 1)}>{i + 1}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">検索</Button>
      </form>
    </Form>
  );
} 