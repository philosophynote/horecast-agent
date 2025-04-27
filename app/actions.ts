"use server";

import { mastra } from "@/mastra";

/**
 * 任意のエージェントにプロンプトを投げて応答を取得する汎用アクション
 * @param agentName エージェント名
 * @param prompt プロンプト文字列
 */
export async function callAgent(agentName: string, prompt: string) {
  const agent = mastra.getAgent(agentName);
  const result = await agent.generate(prompt);
  return result;
} 