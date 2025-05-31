import { Mastra } from '@mastra/core';
import { ConsoleLogger } from "@mastra/core/logger";
import { predictRaceAgent } from './agents/predictRaceAgent';
import { LibSQLStore } from "@mastra/libsql";

export const mastra = new Mastra({
  agents: {
    predictRaceAgent: predictRaceAgent,
  },
  logger: new ConsoleLogger({
    name: "Mastra",
    level: "debug",
  }),
  storage: new LibSQLStore({
    url: "file:./mastra.db",
  }),
});