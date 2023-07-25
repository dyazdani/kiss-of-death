import Player from "./Player";

interface PlayerCircleProps {
    allPlayerIds: string[]
}

//TODO: give Player a class that styles them with an X on top of them if isDead is true

const PlayerCircle = ({allPlayerIds}: PlayerCircleProps) => {
    return (
        <div className="circle-wrapper"> 
            <Player playerId={allPlayerIds[0]} circleDeg="deg-0" playerName="Player 1" />
            <Player playerId="comp1" circleDeg="deg-30" playerName="Comp 1" />
            <Player playerId="comp2" circleDeg="deg-60" playerName="Comp 2" />
            <Player playerId={allPlayerIds[1]} circleDeg="deg-90" playerName="Player 2" />
            <Player playerId="comp3" circleDeg="deg-120" playerName="Comp 3" />
            <Player playerId="comp4" circleDeg="deg-150" playerName="Comp 4" />
            <Player playerId={allPlayerIds[2]} circleDeg="deg-180" playerName="Player 3" />
            <Player playerId="comp5" circleDeg="deg-210" playerName="Comp 5" />
            <Player playerId="comp6" circleDeg="deg-240" playerName="Comp 6" />
            <Player playerId={allPlayerIds[3]} circleDeg="deg-270" playerName="Player 4" />
            <Player playerId="comp7" circleDeg="deg-300" playerName="Comp 7" />
            <Player playerId="comp8" circleDeg="deg-330" playerName="Comp 8" />

        </div>

    )
}

export default PlayerCircle;