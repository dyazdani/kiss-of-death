import Player from "./Player";

interface PlayerCircleProps {
    allPlayerIds: string[]
}

//TODO: give Player a class that styles them with an X on top of them if isDead is true
// TODO: rename comps starting with "comp0"
const PlayerCircle = ({allPlayerIds}: PlayerCircleProps) => {
    return (
        <div className="circle-wrapper"> 
            <Player playerId={allPlayerIds[0]} circleDeg="deg-0" playerName="P1" />
            <Player playerId="comp1" circleDeg="deg-30" playerName="C1" />
            <Player playerId="comp2" circleDeg="deg-60" playerName="C2" />
            <Player playerId={allPlayerIds[1]} circleDeg="deg-90" playerName="P2" />
            <Player playerId="comp3" circleDeg="deg-120" playerName="C3" />
            <Player playerId="comp4" circleDeg="deg-150" playerName="C4" />
            <Player playerId={allPlayerIds[2]} circleDeg="deg-180" playerName="P3" />
            <Player playerId="comp5" circleDeg="deg-210" playerName="C5" />
            <Player playerId="comp6" circleDeg="deg-240" playerName="C6" />
            <Player playerId={allPlayerIds[3]} circleDeg="deg-270" playerName="P4" />
            <Player playerId="comp7" circleDeg="deg-300" playerName="C7" />
            <Player playerId="comp8" circleDeg="deg-330" playerName="C8" />

        </div>

    )
}

export default PlayerCircle;