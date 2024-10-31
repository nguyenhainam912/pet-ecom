"use client"; // if you are planing to use it in the component which is not marker with use client directive this is a must

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation"; // usePathname is a hook now imported from navigation

const ActiveLink = ({
  children,
  ...rest
}: { children: React.ReactNode } & LinkProps) => {
  const { href } = rest;
  const pathName = usePathname();
  let isActive;
  if (href === "/") {
    isActive = pathName.match(new RegExp("^" + href + "$"));
  } else {
    isActive = pathName.startsWith(href as string);
  }

  return (
    // you get a global isActive class name, it is better than
    // nothing, but it means you do not have scoping ability in
    // certain cases
    <Link {...rest} className={isActive ? "active" : ""}>
      {children}
    </Link>
  );
};

export default ActiveLink;
