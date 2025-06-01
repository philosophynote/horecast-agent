import { Mastra } from '@mastra/core';
import { PinoLogger } from "@mastra/loggers";
import { predictRaceAgent } from './agents/predictRaceAgent';
// import { LibSQLStore } from "@mastra/libsql";
import { VercelDeployer } from "@mastra/deployer-vercel";

export const mastra = new Mastra({
  agents: {
    predictRaceAgent: predictRaceAgent,
  },
  logger: new PinoLogger({
    name: "Mastra",
    level: "debug",
  }),
  // storage: new D1Store({
  //   binding: "DB", // D1バインディング名
  // }),
  deployer: new VercelDeployer({
    teamSlug: "horecast",
    projectName: "horecast-agent",
    token: process.env.VERCEL_TOKEN!,
  }),
});