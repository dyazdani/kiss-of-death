import AnimalToken from "./AnimalToken";
import blackWidow from "./../assets/black-widow.png"
import poisonDartFrog from "./../assets/poison-dart-frog.png"
import komodoDragon from "./../assets/komodo-dragon.png"
import kingCobra from "./../assets/king-cobra.png"
import { PlayersObject } from "./../logic";

interface PlayerCircleProps {
    allPlayersObject: PlayersObject
    player1: string
    player2: string
    player3: string
    player4: string
    allPlayersReady: boolean
}


//TODO: give Player a class that styles them with an X on top of them if isDead is true
const PlayerCircle = ({allPlayersObject, player1, player2, player3, player4, allPlayersReady}: PlayerCircleProps) => {
    return (
        <div className={`circle-wrapper ${allPlayersReady ? "" : "hidden"}`}> 
            <AnimalToken  
                picFilePath={blackWidow}
                circleDeg="deg-45"
                isDead={allPlayersObject[player1].isDead} 
            />
            <AnimalToken 
                picFilePath={kingCobra}
                circleDeg="deg-135"
                isDead={allPlayersObject[player2].isDead}  
            />
            <AnimalToken 
                picFilePath={komodoDragon}
                circleDeg="deg-225"
                isDead={allPlayersObject[player3].isDead}  
            />
            <AnimalToken 
                picFilePath={poisonDartFrog}
                circleDeg="deg-315"   
                isDead={allPlayersObject[player4].isDead}   
            />
        </div>

    )
}

export default PlayerCircle;