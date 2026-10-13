import { allPages } from "../../lib/pages";

export const dynamic = "force-static";

export function GET() {
  const index = allPages().map(({ title, description, url }) => ({ title, description, url }));
  return Response.json(index, { headers: { "Cache-Control": "public, max-age=3600" } });
}
