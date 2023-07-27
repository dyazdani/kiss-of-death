import AnimalToken from "./AnimalToken";
import Avatar from "./Avatar";
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
            <AnimalToken  
                picFilePath={blackWidow}
                circleDeg="deg-45" 
            />
            <Avatar 
                avatarUrl={`${players[allPlayerIds[0]].avatarUrl}`} 
                circleDeg="deg-45" 
                playerName={`${players[allPlayerIds[0]].displayName}`}
            />
            <AnimalToken 
                picFilePath={kingCobra}
                circleDeg="deg-135" 
            />
            <Avatar 
                avatarUrl={`${players[allPlayerIds[1]].avatarUrl}`} 
                circleDeg="deg-135"
                playerName={`${players[allPlayerIds[1]].displayName}`} 
            />
            <AnimalToken 
                picFilePath={komodoDragon}
                circleDeg="deg-225" 
            />
            <Avatar 
                avatarUrl={`${players[allPlayerIds[2]].avatarUrl}`}
                circleDeg="deg-225" 
                playerName={`${players[allPlayerIds[2]].displayName}`} 
            />
            <AnimalToken 
                picFilePath={poisonDartFrog}
                circleDeg="deg-315"     
            />
            <Avatar 
                avatarUrl={`${players[allPlayerIds[3]].avatarUrl}`} 
                circleDeg="deg-315"
                playerName={`${players[allPlayerIds[3]].displayName}`}
            />

        </div>

    )
}

export default PlayerCircle;