## 推奨構成

| 役割 | ライブラリ | 主要ポイント |
|---|---|---|
| Markdown → AST | **remark** + `remark-gfm` | GFM（テーブル・チェックボックス等）対応 |
| AST → HTML / React | **rehype** 系 + `rehype-sanitize` | XSS 対策を必ず挿入 |
| レンダラ | **MDX（@next/mdx）** *or* `react-markdown` | - 静的ページ: MDX でビルド時にコンパイル<br>- API からの文字列: Server Component + `react-markdown` |
| UI | **shadcn/ui** | `components` にマッピングし再利用 |

---

## 実装例 1 — 静的ページ（MDX）

> LLM 出力をファイル化して管理する、またはビルド時に確定している場合。

```tsx
// app/docs/[slug]/page.tsx  (Server Component)
import { allDocs } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { mdxComponents } from '@/components/mdx'  // shadcn コンポーネントマップ

export default function Doc({ params }: { params: { slug: string } }) {
  const doc = allDocs.find(d => d.slug === params.slug)!
  const MDX = useMDXComponent(doc.body.code)
  return (
    <article className="prose dark:prose-invert">
      <MDX components={mdxComponents} />
    </article>
  )
}
```

*メリット*

- 0 JS で高速描画・SEO 最適。
- Markdown 内に `<Alert>` や `<Card>` など shadcn コンポーネントを直接記述可能。


