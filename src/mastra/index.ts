import { Mastra } from '@mastra/core';
import { createLogger } from "@mastra/core/logger";
import { predictRaceAgent } from './agents/predictRaceAgent';

export const mastra = new Mastra({
  agents: {
    predictRaceAgent: predictRaceAgent,
  },
  logger: createLogger({
    name: "Mastra",
    level: "debug",
  }),
});