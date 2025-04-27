import { Mastra } from '@mastra/core';
import { raceAgent } from './agents/raceAgent';

export const mastra = new Mastra({
  agents: { raceAgent },
});
        