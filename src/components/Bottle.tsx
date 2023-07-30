import bottle from "./../assets/bottle-green.png"
import { PlayersObject } from "../logic"

interface BottleProps {
    playersReady: object[]
    kissee: string
    allPlayersObject: PlayersObject
}
const Bottle = ({playersReady, kissee, allPlayersObject}: BottleProps) => {
    let newAngle = "0"
    
    if (kissee) {
        const angleOfKissee = 
            allPlayersObject[kissee].animal === "poison-dart-frog" ? "45" 
            : allPlayersObject[kissee].animal === "black-widow" ? "135"
            : allPlayersObject[kissee].animal === "king-cobra" ? "225"
            : allPlayersObject[kissee].animal === "komodo-dragon" ? "315" 
            : "";

        newAngle = angleOfKissee + 2 * 360 * 360;
    }

    //TODO: assign an old and new kissee in game state to compare
    return (
        <div className={`${playersReady.length === 4 ? "" : "hidden"} bottle-wrapper`}>
            <img className={`${playersReady.length === 4 ? "" : "hidden"} rotate-${newAngle}-deg ${kissee ? "bottle-spinning": ""} bottle`} src={bottle}/>
        </div>
    )
}

export default Bottle;