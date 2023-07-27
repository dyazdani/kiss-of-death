interface PlayerProps {
    playerId: string
    circleDeg: string
    playerName: string
    avatarUrl: string
} 

const Player = ({playerId, circleDeg, playerName, avatarUrl}: PlayerProps) => {
    return (
            <div id={playerId} className={`circle ${circleDeg}`}>{playerName}
                <img className={`avatar ${playerId}`} src={avatarUrl}/>      
            </div>
    )
}

export default Player;