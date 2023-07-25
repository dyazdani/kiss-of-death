import { useEffect, useState } from "react"
import "./App.css"
import { GameState } from "./logic.ts"
import PlayerCircle from "./components/PlayerCircle.tsx"

function App() {
  const [game, setGame] = useState<GameState>()
  const [playerWhoSpun, setPlayerWhoSpun] = useState('')

  useEffect(() => {
    Rune.initClient({
      onChange: ({ newGame, action }) => {
        setGame(newGame)
        if (action) {
          setPlayerWhoSpun(action.playerId)
        }
      }
    })
  }, [])

  if (!game) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>Kiss of Death</h1>
      <PlayerCircle allPlayerIds={game.allPlayerIds}/>
      <button type="button" onClick={() => {Rune.actions.spinBottle({game: game, playerId: playerWhoSpun})}}>Spin the Bottle</button>
    </>
  )
}

export default App
