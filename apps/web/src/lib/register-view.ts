import { buildReport } from "@01/unknowns/report";
import type { Item } from "@01/unknowns/schema";
import raw from "../generated/register.json";

export const items = raw as unknown as Item[];

export const registerReport = (asOf: string) => buildReport(items, asOf);
