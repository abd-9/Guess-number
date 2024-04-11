import { useAppSelector } from "@/app/redux/hooks";
import ActiveRoundSection from "@/components/game/(round board)";
import LoginSection from "@/components/game/login";
import ScoreBar from "@/components/game/score";
import RankSection from "@/components/game/rank";
import ChatSection from "@/components/game/chat";
import { GameBoard } from "@/components/game/gameBoard";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

export default async function Home() {
  return (
    <>
      <div className="grid h-5/6 w-full grid-flow-col grid-cols-10 grid-rows-8 gap-4 px-4 py-4">
        <div className=" col-span-3 row-span-8   ">
          <GameBoard></GameBoard>
        </div>
        <div className="col-span-7 row-span-1  w-full">
          <ScoreBar />
        </div>
        <div className="col-span-7   row-span-7 w-full rounded-xl  border-2 border-primaryBorder bg-background p-4 text-white">
          Main content
        </div>
      </div>

      <div className="grid h-1/4 w-full grid-cols-2 gap-4 px-4 ">
        <div className="  col-span-1  w-full overflow-hidden rounded-xl border-primaryBorder ">
          <h4 className="mb-2 font-bold">
            <MilitaryTechIcon fontSize="small" />
            Ranking
          </h4>
          <RankSection />
        </div>

        <div className="col-span-1  w-full overflow-hidden ">
          <h4 className="mb-2 font-bold">
            <QuestionAnswerIcon fontSize="small" /> Chat
          </h4>
          <div
            className=" rounded-xl  border-2 border-primaryBorder bg-background"
            style={{ height: "calc(100% - 2em)" }}
          >
            <ChatSection />
          </div>
        </div>
      </div>
    </>
  );
}
