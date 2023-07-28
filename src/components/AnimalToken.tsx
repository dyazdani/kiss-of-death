interface AnimalTokenProps {
    picFilePath: string
    circleDeg: string
}
const AnimalToken = ({picFilePath, circleDeg}: AnimalTokenProps) => {
    return (
        <div className={`animal-token circle ${circleDeg}`}>
            <img className="animal-img" src={picFilePath} />
        </div>

    )
}

export default AnimalToken;