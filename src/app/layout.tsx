import type { Metadata } from "next"
import { Providers } from "@/components/providers/providers"
import "./globals.css"
import { cn } from "@/lib/utils"
import { eb_garamond, inter } from "@/utils/font"


export const metadata: Metadata = {
    title: "Looming",
    description: "open source twitter/x bookmark manager",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className={cn(inter.variable, eb_garamond.variable)}>
            <body className={`min-h-[calc(100vh-1px)] flex flex-col font-sans bg-brand-50 text-brand-950 antialiased`} suppressHydrationWarning>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
