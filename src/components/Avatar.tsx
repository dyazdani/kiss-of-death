
interface AvatarProps {
    avatarUrl: string
    playerName: string
}

const Avatar = ({avatarUrl, playerName}: AvatarProps) => {
    return (
        <>
            <div className={`avatar`}>
                <img src={avatarUrl}/>
                <p className="player-name">{playerName}</p>      
            </div>

        </>

    )
}

export default Avatar;