
interface AvatarProps {
    avatarUrl: string
    circleDeg: string
    playerName: string
}

const Avatar = ({avatarUrl, circleDeg, playerName}: AvatarProps) => {
    return (
        <>
            <div className={`avatar circle ${circleDeg}`}>
                <img src={avatarUrl}/>
                <p className="player-name">{playerName}</p>      
            </div>

        </>

    )
}

export default Avatar;