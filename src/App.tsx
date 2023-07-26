import { useEffect, useState } from "react"
import "./App.css"
import { GameState } from "./logic.ts"
import PlayerCircle from "./components/PlayerCircle.tsx"

function App() {
  const [game, setGame] = useState<GameState>()
  const [myPlayerId, setmyPlayerId] = useState("")

  useEffect(() => {
    import("./logic").then(() => {
      Rune.initClient({
        onChange: ({ newGame, yourPlayerId }) => {
          setGame(newGame)

          if (yourPlayerId) {
            setmyPlayerId(yourPlayerId)
          }
          }
      })
    })
  }, [])

  if (!game) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>Kiss of Death</h1>
      <PlayerCircle allPlayerIds={game.allPlayerIds}/>
      <button type="button" onClick={() => {Rune.actions.spinBottle(myPlayerId)}}>Spin the Bottle</button>
      <p>{`It is ${game.turnOrder[0]}'s turn`}</p>
      <p>{typeof game.kissee === "string" && game.kissee.length > 0 && `The bottle pointed to ${game.kissee}, who was kissed and then died`}</p>
    </>
  )
}

export default App
