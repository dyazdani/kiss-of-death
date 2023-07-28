import arrow from "./../assets/arrow.png"

interface TurnArrowsProps {
    player1: string
    player2: string
    player3: string
    player4: string
    playersReady: number
    currentTurnPlayer: string
}

const TurnArrows = ({player1, player2, player3, player4, currentTurnPlayer, playersReady}: TurnArrowsProps) => {
    return (
        <div className={`arrow-wrapper ${playersReady === 4 ? "" : "hidden"}`}>
            <div id="arrow-1" className={`${player1 === currentTurnPlayer ? "" : "hidden"}`}>
                <img src={arrow} />
            </div>
            <div id="arrow-2" className={`${player2 === currentTurnPlayer ? "" : "hidden"}`}>
                <img src={arrow}/>
            </div>
            <div id="arrow-3" className={`${player3 === currentTurnPlayer ? "" : "hidden"}`}>
                <img src={arrow}/>
            </div>
            <div id="arrow-4" className={`${player4 === currentTurnPlayer ? "" : "hidden"}`}>
                <img src={arrow}/>
            </div>
        </div>
    )
}

export default TurnArrows;