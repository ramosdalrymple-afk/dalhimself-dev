"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// This is the safest way to get the props in the new version
export function ThemeProvider({ 
  children, 
  ...props 
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}