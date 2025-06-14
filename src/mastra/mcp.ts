import { MCPClient } from "@mastra/mcp";

/**
 * MCP サーバー設定
 * すべて STDIO で起動し、必要に応じて API キーを環境変数で渡す。
 */

// グローバルスコープでシングルトン化
const globalForMcp = globalThis as unknown as { mcp?: MCPClient };

export const mcp =
  globalForMcp.mcp ??
  (globalForMcp.mcp = new MCPClient({
    servers: {
      // ──────────────────────────────────────────────────────────
      // Perplexity Ask MCP  ─ Sonar API 連携
      // ──────────────────────────────────────────────────────────
      /**
       * Perplexity Sonar API キーは .env で
       *   PERPLEXITY_API_KEY=xxxxxxxxxxxxxxxx
       * を定義。
       *
       * 利用できるリモートツール:
       *   perplexity_ask
       * → 例: await mcp.getTool("perplexity-ask#perplexity_ask")
       */
      "perplexity-ask": {
        command: "docker",
        args: [
            "run",
            "-i",
            "--rm",
            "-e",
            "PERPLEXITY_API_KEY",
            "mcp/perplexity-ask"
          ],
        env: {
          PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY ?? "",
        },
      }
    },
  }));
