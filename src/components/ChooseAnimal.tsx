import { GameState } from "../logic"

interface ChooseAnimalProps {
    animalName: string
    game: GameState
    playerId: string
    circleDeg: string
}

const ChooseAnimal = ({animalName, game, playerId, circleDeg}: ChooseAnimalProps) => {
    return (
        <div className={`animal-token choose circle deg-${circleDeg}`}>
            <button 
                className={`animal-button ${animalName}`}
                disabled={game && !!game.allPlayers[playerId].animal} 
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