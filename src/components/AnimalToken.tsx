interface AnimalTokenProps {
    picFilePath: string
    circleDeg: string
    isDead: boolean
}
const AnimalToken = ({picFilePath, circleDeg, isDead}: AnimalTokenProps) => {
    return (
        <div className={`animal-token circle ${circleDeg}`}>
            <img className={`animal-img ${isDead ? "dead": ""}`} src={picFilePath} />
            <p className={`skull ${isDead ? "" : "dead"}`}>☠️</p>
        </div>

    )
}

export default AnimalToken;