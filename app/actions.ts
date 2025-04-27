"use server";

import { mastraPromise } from "@/mastra";

/**
 * 任意のエージェントにプロンプトを投げて応答を取得する汎用アクション
 * @param agentName エージェント名
 * @param prompt プロンプト文字列
 */
export async function callAgent(agentName: "raceAgent", prompt: string) {
  const mastra = await mastraPromise;
  const agent = mastra.getAgent(agentName);
  const result = await agent.generate(prompt);
  return result;
} 