import bottle from "./../assets/bottle-green.png"
import { PlayersObject } from "../logic"

interface BottleProps {
    playersReady: object[]
    kissee: string
    allPlayersObject: PlayersObject
    playersLeft: number
    spinning: string
}
const Bottle = ({playersReady, kissee, allPlayersObject, playersLeft, spinning}: BottleProps) => {
    let newAngle = "0"

    
    if (kissee) {
        const angleOfKissee = 
            allPlayersObject[kissee].animal === "poison-dart-frog" ? "45" 
            : allPlayersObject[kissee].animal === "black-widow" ? "135"
            : allPlayersObject[kissee].animal === "king-cobra" ? "225"
            : allPlayersObject[kissee].animal === "komodo-dragon" ? "315" 
            : "";

        newAngle = angleOfKissee
    }

    //TODO: assign an old and new kissee in game state to compare
    return (
        <div className={`${playersReady.length === 4 ? "" : "hidden"} bottle-wrapper`}>
            <img onAnimationEnd={() => {Rune.actions.endSpinning()}} alt={spinning} className={`point-${newAngle} ${playersReady.length === 4 ? "" : "hidden"} ${kissee ? "bottle-spinning": ""} ${playersLeft < 3 ? "bottle-spin-2" : ""} bottle`} src={bottle}/>
        </div>
    )
}

export default Bottle;