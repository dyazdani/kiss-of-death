import backgroundMusic from "../assets/background-music.mp3"

interface MusicProps {
    areAllPlayersReady: boolean
}

const Music = ({areAllPlayersReady}: MusicProps) => {
    if (areAllPlayersReady) {
        return (<audio src={backgroundMusic} autoPlay={true} loop={true} />)
    }
} 

export default Music;