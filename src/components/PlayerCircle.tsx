import AnimalToken from "./AnimalToken";
import blackWidow from "./../assets/black-widow.png"
import poisonDartFrog from "./../assets/poison-dart-frog.png"
import komodoDragon from "./../assets/komodo-dragon.png"
import kingCobra from "./../assets/king-cobra.png"




//TODO: give Player a class that styles them with an X on top of them if isDead is true
const PlayerCircle = () => {
    return (
        <div className="circle-wrapper"> 
            <AnimalToken  
                picFilePath={blackWidow}
                circleDeg="deg-45" 
            />
            <AnimalToken 
                picFilePath={kingCobra}
                circleDeg="deg-135" 
            />
            <AnimalToken 
                picFilePath={komodoDragon}
                circleDeg="deg-225" 
            />
            <AnimalToken 
                picFilePath={poisonDartFrog}
                circleDeg="deg-315"     
            />
        </div>

    )
}

export default PlayerCircle;