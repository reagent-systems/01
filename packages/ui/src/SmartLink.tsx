import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<"a"> & { href: string };

/** next/link for internal routes, a plain anchor for absolute URLs, mailto:, and tel:. */
export function SmartLink({ href, ...rest }: Props) {
  if (/^(https?:|mailto:|tel:)/.test(href)) return <a href={href} {...rest} />;
  // next/link types do not accept explicit `undefined` under exactOptionalPropertyTypes.
  return <Link href={href} {...(rest as Omit<ComponentProps<typeof Link>, "href">)} />;
}
