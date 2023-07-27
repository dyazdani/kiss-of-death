
interface AvatarProps {
    avatarUrl: string
    playerName: string
    animal: string
}

const Avatar = ({avatarUrl, playerName, animal}: AvatarProps) => {
    return (
        <>
            <div className={`avatar ${animal}`}>
                <img src={avatarUrl}/>
                <p className="player-name">{playerName}</p>      
            </div>

        </>

    )
}

export default Avatar;