import AnimalToken from "./AnimalToken";
import blackWidow from "./../assets/black-widow.png"
import poisonDartFrog from "./../assets/poison-dart-frog.png"
import komodoDragon from "./../assets/komodo-dragon.png"
import kingCobra from "./../assets/king-cobra.png"
import { PlayersObject } from "./../logic";

interface PlayerCircleProps {
    allPlayersObject: PlayersObject
    playersReady: object[]
}

//TODO: give Player a class that styles them with an X on top of them if isDead is true
const PlayerCircle = ({allPlayersObject, playersReady}: PlayerCircleProps) => {
    console.log(allPlayersObject)
    console.log(playersReady)

    const getTargetPlayerId = (animalPlayerChose: string, playersReady: object[]) => {
        const indexWithTargetPlayerObject = playersReady.findIndex((obj: object) => Object.hasOwn(obj, animalPlayerChose));
        return Object.values(playersReady[indexWithTargetPlayerObject])[0];
    }

    return (
        <div className={`circle-wrapper ${playersReady.length === 4 ? "" : "hidden"}`}> 
            <AnimalToken  
                picFilePath={blackWidow}
                circleDeg="deg-45"
                isDead={playersReady.length === 4 &&
                    allPlayersObject[getTargetPlayerId("black-widow", playersReady)].isDead
                    } 
            />
            <AnimalToken 
                picFilePath={kingCobra}
                circleDeg="deg-135"
                isDead={playersReady.length === 4 &&
                    allPlayersObject[getTargetPlayerId("king-cobra", playersReady)].isDead
                }
            />
            <AnimalToken 
                picFilePath={komodoDragon}
                circleDeg="deg-225"
                isDead={playersReady.length === 4 &&
                    allPlayersObject[getTargetPlayerId("komodo-dragon", playersReady)].isDead
                }            
            />
            <AnimalToken 
                picFilePath={poisonDartFrog}
                circleDeg="deg-315"   
                isDead={playersReady.length === 4 &&
                    allPlayersObject[getTargetPlayerId("poison-dart-frog", playersReady)].isDead
                }             
            />
        </div>

    )
}

export default PlayerCircle;