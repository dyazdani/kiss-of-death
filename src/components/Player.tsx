interface PlayerProps {
    playerId: string
    circleDeg: string
    playerName: string
} 

const Player = ({playerId, circleDeg, playerName}: PlayerProps) => {
    return <div id={playerId} className={`circle ${circleDeg}`}>{playerName}</div>
}

export default Player;