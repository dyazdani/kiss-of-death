
//TODO: give Player a class that styles them with an X on top of them if isDead is true

const PlayerCircle = () => {
    return (
        <div className="circle-wrapper"> 
            <Player playerId={playerId1} className="circle deg-0">Player 1</Player>
            <Player playerId="comp1" className="circle deg-30">Comp 1</Player>
            <Player playerId="comp2" className="circle deg-60">Comp 2</Player>
            <Player playerId={playerId2} className="circle deg-90">Player 2</Player>
            <Player playerId="comp3" className="circle deg-120">Comp 3</Player>
            <Player playerId="comp4" className="circle deg-150">Comp 4</Player>
            <Player playerId={playerId3} className="circle deg-180">Player 3</Player>
            <Player playerId="comp5" className="circle deg-210">Comp 5</Player>
            <Player playerId="comp6" className="circle deg-240">Comp 6</Player>
            <Player playerId={playerId4} className="circle deg-270">Player 4</Player>
            <Player playerId="comp7" className="circle deg-300">Comp 7</Player>
            <Player playerId="comp8" className="circle deg-330">Comp 8</Player>

        </div>

    )
}

export default PlayerCircle;