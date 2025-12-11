
import "@/app/globals.css";

export const metadata = {
  title: "My App",
  description: "Description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-black text-black dark:text-white">
          {children}
      </body>
    </html>
  );
}
