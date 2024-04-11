import LoginSection from "@/components/game/login";
import ScoreBar from "@/components/game/score";
import RankSection from "@/components/game/rank";
import ChatSection from "@/components/game/chat";
import ActiveRoundSection from "@/components/game/(round board)";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";

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
    <main className="flex h-full w-full flex-col items-center justify-center  py-10 md:px-12 lg:px-36">
      {children}

      {/* <Suspense fallback="...">{children}</Suspense> */}
    </main>
  );
}
