import { useEffect, useState } from "react"
import "./App.css"
import { GameState } from "./logic.ts"
import PlayerCircle from "./components/PlayerCircle.tsx"

function App() {
  const [game, setGame] = useState<GameState>()
  const [myPlayerId, setMyPlayerId] = useState("")
  // const [playersReady, setPlayersReady] = useState<string[]>([])

  useEffect(() => {
      Rune.initClient({
        onChange: ({ newGame, yourPlayerId }) => {
          setGame(newGame)

          if (yourPlayerId) {
            setMyPlayerId(yourPlayerId)
          }
          }
      })
  }, [])

  if (!game) {
    return <div>Loading...</div>
  }

  return (
    // TODO: use the players' display names 
    // TODO: Use players' avatars
    // TODO: Use images for comps
    // TODO: Use sound for kiss/komodo dragon
    // Use div in the middle of the circle for game updates 
    <>
      <h1>Kiss of Death</h1>
      <button 
        type="button" 
        onClick={() => {Rune.actions.handleReadyButtonClick(myPlayerId)}}
        disabled={game.playersReady.includes(myPlayerId)}
        className={`${game.playersReady.length < 4 ? "" : "hidden"}`}
      >
        🟢 I'M READY!
      </button>
      <PlayerCircle allPlayerIds={game.allPlayerIds}/>
      <button 
        className={`${game.playersReady.length < 4 ? "hidden" : ""}`}
        disabled={
          myPlayerId !== game.turnOrder[0] || game.allPlayers[myPlayerId].isDead
        } 
        type="button" 
        onClick={() => {
          Rune.actions.spinBottle(myPlayerId)
        }}
        >Spin the Bottle</button>
      <p>{game.playersReady.length < 4 ? "" : `It is ${game.turnOrder[0]}'s turn`}</p>
      <p>{typeof game.kissee === "string" && game.kissee.length > 0 && `The bottle pointed to ${game.kissee}, who was kissed and then died`}</p>
    </>
  )
}

export default App
