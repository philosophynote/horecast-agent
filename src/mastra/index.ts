import { Mastra } from '@mastra/core';
import { createRaceAgent } from './agents/raceAgent';

export const mastraPromise = (async () => {
  const raceAgent = await createRaceAgent();
  return new Mastra({
    agents: { raceAgent },
  });
})();
        