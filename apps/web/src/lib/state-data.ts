import raw from "../generated/states.json";
import { states, type UsState } from "./states";

type Source = { source: string };
type Url = { url: string };

export type StateResearch = {
  state: string;
  slug: string;
  abbr: string;
  researched: string;
  hardwareHubs: ({ city: string; note: string } & Source)[];
  makerspaces: ({ name: string; city: string; note: string } & Url)[];
  events: ({ name: string; city: string; cadence?: string; month?: string; note: string } & Url)[];
  programs: ({ name: string; city: string; note: string } & Url)[];
  specialties: ({ name: string; note: string } & Source)[];
  support: ({ name: string; note: string } & Url)[];
};

const data = raw as unknown as Record<string, StateResearch>;

export const getResearch = (slug: string): StateResearch | undefined => data[slug];

/** A state page is only published once it has real, sourced entries. */
export const hasEnoughResearch = (r: StateResearch | undefined): r is StateResearch =>
  !!r && r.makerspaces.length + r.programs.length + r.events.length >= 3;

export const researchedStates = (): UsState[] =>
  states.filter((s) => hasEnoughResearch(getResearch(s.slug)));

/** Every distinct source URL on a state's page, for the sources list. */
export function sourcesFor(r: StateResearch): string[] {
  const urls = [
    ...r.hardwareHubs.map((x) => x.source),
    ...r.makerspaces.map((x) => x.url),
    ...r.events.map((x) => x.url),
    ...r.programs.map((x) => x.url),
    ...r.specialties.map((x) => x.source),
    ...r.support.map((x) => x.url),
  ];
  return [...new Set(urls)];
}
