import { notFound } from "next/navigation";
import { Dashboard, dashboardTitle } from "../../../components/Dashboard";
import { type Role, roles } from "../../../lib/dashboards";
import { pageMetadata } from "../../../lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => roles.map((role) => ({ role }));

type Props = { params: Promise<{ role: string }> };

export async function generateMetadata({ params }: Props) {
  const { role } = await params;
  if (!roles.includes(role as Role)) return {};
  return pageMetadata({
    title: dashboardTitle[role as Role],
    description: "Dashboard preview with sample data.",
    path: `/dashboard/${role}`,
    noindex: true,
  });
}

export default async function DashboardPage({ params }: Props) {
  const { role } = await params;
  if (!roles.includes(role as Role)) notFound();
  return <Dashboard role={role as Role} />;
}
