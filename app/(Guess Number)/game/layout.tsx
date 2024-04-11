import LoginSection from "@/components/game/login";
import ScoreBar from "@/components/game/score";
import RankSection from "@/components/game/rank";
import { Suspense } from "react";
import ChatSection from "@/components/game/chat";
import ActiveRoundSection from "@/components/game/(round board)";

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
      <div className="grid h-3/4 w-full grid-flow-col grid-cols-10 grid-rows-8 gap-4 px-4 py-4">
        <div className=" col-span-3 row-span-8  rounded-xl border-2 border-b border-primaryBorder p-4  ">
          {/* <LoginSection session={null} /> */}
          <ActiveRoundSection />
        </div>
        <div className="col-span-7 row-span-1  w-full">
          <ScoreBar />
        </div>
        <div className="col-span-7   row-span-7 w-full rounded-xl  border-2 border-primaryBorder bg-background p-4 text-white">
          Main content
        </div>
      </div>

      <div className="grid h-1/4 w-full grid-cols-2 gap-4 px-4 py-4">
        <div className="  col-span-1  w-full overflow-hidden rounded-xl border-primaryBorder ">
          <RankSection />
        </div>
        <div className="col-span-1  w-full overflow-hidden  rounded-xl  border-2 border-primaryBorder bg-background">
          <ChatSection />
        </div>
      </div>
      {/* <Suspense fallback="...">{children}</Suspense> */}
    </main>
  );
}
