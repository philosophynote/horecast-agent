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
  raceName: string;
};

/**
 * 競馬レース情報入力フォーム
 * - 開催日、レース名を入力
 */
export function RaceForm({ onSubmit }: { onSubmit: (data: RaceFormData) => void }) {
  const form = useForm<RaceFormData>({
    defaultValues: {
      date: "",
      raceName: "",
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
          name="raceName"
          rules={{ required: "レース名を入力してください" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>レース名</FormLabel>
              <FormControl>
                <Input type="text" placeholder="例: 皐月賞" {...field} />
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