import bottle from "./../assets/bottle-green.png"

interface BottleProps {
    playersReady: object[]
}
const Bottle = ({playersReady}: BottleProps) => {
    return (
        <div className={`${playersReady.length === 4 ? "" : "hidden"} bottle-wrapper`}>
            <img className="bottle" src={bottle}/>
        </div>
    )
}

export default Bottle;