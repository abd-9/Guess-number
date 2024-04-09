import LoginSection from "@/components/game/login";
import { Suspense } from "react";

export const metadata = {
  title: "Guess Number",
  description: "Multipalyer game, with chat",
  metadataBase: new URL("https://www.google.com"),
  themeColor: "#bbbbb",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center  py-16 md:px-12 lg:px-36">
      <div className="grid h-3/4 w-full grid-flow-col grid-rows-2 gap-4 px-4 py-4">
        <div className="col-span-1 row-span-2 w-full rounded-xl border-2 border-b  border-gray-200 bg-white/50 p-4 ">
          <LoginSection session={null} />
        </div>
        <div className="col-span-5 w-full rounded-xl bg-fuchsia-800 p-4">
          Palyer score
        </div>
        <div className="col-span-5   w-full rounded-xl bg-fuchsia-700 p-4">
          Main content
        </div>
      </div>

      <div className="grid h-1/4 w-full grid-cols-2 gap-4 px-4 py-4">
        <div className="col-span-1  w-full rounded-xl bg-blue-900 p-4">
          Rank Dashboard
        </div>
        <div className="col-span-1  w-full rounded-xl bg-blue-900 p-4">
          Chat Board
        </div>
      </div>
      {/* <Suspense fallback="...">{children}</Suspense> */}
    </main>
  );
}
