import * as React from "react";
import { useMemo } from "react";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import type { RaceInfo } from "../api/race/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Markdown/MDX文字列を安全にReact要素としてレンダリングするコンポーネント
 */
function MarkdownRenderer({ content }: { content: string }) {
  const render = useMemo(() => {
    return unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeReact, { createElement: React.createElement })
      .processSync(content).result;
  }, [content]);
  return <>{render}</>;
}

/**
 * 出馬表・予想結果表示用コンポーネント
 * @param data APIから取得したテキスト
 */
export function RaceResult({ data }: { data: { raceText: string; predictionText: string } }) {
  return (
    <section className="w-full max-w-2xl mx-auto mt-8">
      <div className="mb-8 p-4 border rounded bg-gray-50">
        <h3 className="font-bold mb-2">出馬表</h3>
        <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: data.raceText }} />
      </div>
      <div className="p-4 border rounded bg-white">
        <h3 className="font-bold mb-2">予想結果</h3>
        <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: data.predictionText }} />
      </div>
    </section>
  );
} 