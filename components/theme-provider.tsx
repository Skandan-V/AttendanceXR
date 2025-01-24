"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light" // Set explicit default theme
      enableSystem={false} // Disable system theme to ensure consistent rendering
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

