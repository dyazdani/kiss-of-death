interface PlayerProps {
    playerId: string
    circleDeg: string

} 

const Player = ({playerId, circleDeg }: PlayerProps) => {
    return (
            <div id={playerId} className={`circle ${circleDeg}`}></div>
    )
}

export default Player;