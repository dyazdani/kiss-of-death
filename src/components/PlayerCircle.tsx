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
            <Player 
                playerId={allPlayerIds[0]} 
                circleDeg="deg-0" 
                playerName={`${players[allPlayerIds[0]].displayName}`}
                avatarUrl={`${players[allPlayerIds[0]].avatarUrl}`} 
            />
            <Player 
                playerId={allPlayerIds[1]} 
                circleDeg="deg-90" 
                playerName={`${players[allPlayerIds[1]].displayName}`}
                avatarUrl={`${players[allPlayerIds[1]].avatarUrl}`}
            />
            <Player 
                playerId={allPlayerIds[2]} 
                circleDeg="deg-180" 
                playerName={`${players[allPlayerIds[2]].displayName}`} 
                avatarUrl={`${players[allPlayerIds[2]].avatarUrl}`}
                />
            <Player 
                playerId={allPlayerIds[3]} 
                circleDeg="deg-270" 
                playerName={`${players[allPlayerIds[3]].displayName}`}
                avatarUrl={`${players[allPlayerIds[3]].avatarUrl}`}
                />
        </div>

    )
}

export default PlayerCircle;