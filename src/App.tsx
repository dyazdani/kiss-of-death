import { useEffect, useState } from "react"
import "./App.css"
import { GameState } from "./logic.ts"
import PlayerCircle from "./components/PlayerCircle.tsx"

function App() {
  const [game, setGame] = useState<GameState>()
  useEffect(() => {
    Rune.initClient({
      onChange: ({ newGame }) => {
        setGame(newGame)
      },
    })
  }, [])

  if (!game) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>Kiss of Death</h1>
      <PlayerCircle allPlayerIds={game.allPlayerIds}/>
    </>
  )
}

export default App
