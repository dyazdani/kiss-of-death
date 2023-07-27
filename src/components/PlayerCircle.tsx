import AnimalToken from "./AnimalToken";
import Avatar from "./Avatar";
import Player from "./Player";
import blackWidow from "./../assets/black-widow.png"
import poisonDartFrog from "./../assets/poison-dart-frog.png"
import komodoDragon from "./../assets/komodo-dragon.png"
import kingCobra from "./../assets/king-cobra.png"
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
                circleDeg="deg-45" 
            />
            <AnimalToken picFilePath={blackWidow}/>
            <Avatar 
                avatarUrl={`${players[allPlayerIds[0]].avatarUrl}`} 
                circleDeg="deg-45" 
                playerName={`${players[allPlayerIds[0]].displayName}`}
            />
            <Player 
                playerId={allPlayerIds[1]} 
                circleDeg="deg-135"
            />
            <AnimalToken picFilePath={kingCobra}/>
            <Avatar 
                avatarUrl={`${players[allPlayerIds[1]].avatarUrl}`} 
                circleDeg="deg-135"
                playerName={`${players[allPlayerIds[1]].displayName}`} 
            />
            <Player 
                playerId={allPlayerIds[2]} 
                circleDeg="deg-225" 
            />
            <AnimalToken picFilePath={komodoDragon}/>
            <Avatar 
                avatarUrl={`${players[allPlayerIds[2]].avatarUrl}`}
                circleDeg="deg-225" 
                playerName={`${players[allPlayerIds[2]].displayName}`} 
            />
            <Player 
                playerId={allPlayerIds[3]} 
                circleDeg="deg-315" 
            />
            <AnimalToken picFilePath={poisonDartFrog}/>

            <Avatar 
                avatarUrl={`${players[allPlayerIds[3]].avatarUrl}`} 
                circleDeg="deg-315"
                playerName={`${players[allPlayerIds[3]].displayName}`}
            />

        </div>

    )
}

export default PlayerCircle;