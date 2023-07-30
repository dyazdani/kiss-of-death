interface ChooseAnimalProps {
    animalName: string
    circleDeg: string
    isDisabled: boolean
}

const ChooseAnimal = ({animalName, circleDeg, isDisabled,}: ChooseAnimalProps) => {
    return (
        <div 
            className={`animal-token circle deg-${circleDeg}`}
            id={isDisabled ? `disabled-button-div-${animalName}` : ""}
        >
            <button 
                className={`animal-button ${animalName}`}
                disabled={isDisabled} 
                type="button" 
                onClick={() => {
                    Rune.actions.assignAnimal(animalName)

                }}
            >
            </button>
        </div>
            
    )
}

export default ChooseAnimal;