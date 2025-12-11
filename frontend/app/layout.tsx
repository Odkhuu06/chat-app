// import "@/app/globals.css";
// import DarkToggleProvider from "../components/DarkToggleProvider";

// export const metadata = {
//   title: "My App",
//   description: "Description",
// };

// export default function RootLayout({ children }: { children: React.ReactNode })  {
//   return (
//   <html lang="en">
//   <body className="bg-white dark:bg-black text-black dark:text-white">
//     <DarkToggleProvider>
//       {children}
//     </DarkToggleProvider>
//   </body>
// </html>

//   );
// }
import "@/app/globals.css";
import DarkToggleProvider from "../components/DarkToggleProvider";

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
