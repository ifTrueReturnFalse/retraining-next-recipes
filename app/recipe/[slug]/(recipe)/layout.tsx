import React from "react";
import HeaderCondensed from "@/components/Headers/HeaderCondensed/HeaderCondensed";

export default function RecipeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderCondensed />
      <main>{children}</main>
    </>
  );
}
