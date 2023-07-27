interface AnimalTokenProps {
    picFilePath: string
}
const AnimalToken = ({picFilePath}: AnimalTokenProps) => {
    return (
        <div className="animal-token-wrapper">
            <img src={picFilePath} />
        </div>

    )
}

export default AnimalToken;