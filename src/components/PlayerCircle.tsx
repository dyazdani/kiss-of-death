import Player from "./Player";
import { Players } from "rune-games-sdk/multiplayer";


interface PlayerCircleProps {
    allPlayerIds: string[]
    players: Players
}

//TODO: give Player a class that styles them with an X on top of them if isDead is true
const PlayerCircle = ({allPlayerIds, players}: PlayerCircleProps) => {
    return (
        <div className="circle-wrapper"> 
            <Player playerId={allPlayerIds[0]} circleDeg="deg-0" playerName={`${players[allPlayerIds[0]].displayName}`} />
            <Player playerId="comp1" circleDeg="deg-30" playerName="C1" />
            <Player playerId="comp2" circleDeg="deg-60" playerName="C2" />
            <Player playerId={allPlayerIds[1]} circleDeg="deg-90" playerName={`${players[allPlayerIds[1]].displayName}`} />
            <Player playerId="comp3" circleDeg="deg-120" playerName="C3" />
            <Player playerId="comp4" circleDeg="deg-150" playerName="C4" />
            <Player playerId={allPlayerIds[2]} circleDeg="deg-180" playerName={`${players[allPlayerIds[2]].displayName}`} />
            <Player playerId="comp5" circleDeg="deg-210" playerName="C5" />
            <Player playerId="comp6" circleDeg="deg-240" playerName="C6" />
            <Player playerId={allPlayerIds[3]} circleDeg="deg-270" playerName={`${players[allPlayerIds[3]].displayName}`} />
            <Player playerId="comp7" circleDeg="deg-300" playerName="C7" />
            <Player playerId="comp8" circleDeg="deg-330" playerName="C8" />

        </div>

    )
}

export default PlayerCircle;