import { useEffect, useState } from "react"
import "./App.css"
import { GameState } from "./logic.ts"
import { Players } from "rune-games-sdk/multiplayer"
import PlayerCircle from "./components/PlayerCircle.tsx"
import Avatar from "./components/Avatar.tsx"

function App() {
  const [game, setGame] = useState<GameState>()
  const [myPlayerId, setMyPlayerId] = useState("")
  const [players, setPlayers] = useState<Players>({})

  useEffect(() => {
      Rune.initClient({
        onChange: ({ newGame, yourPlayerId, players }) => {
          setGame(newGame)
          setPlayers(players)

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
    // TODO: Use div in the middle of the circle for game updates 
    <>
      <h1>Kiss of Death</h1>
      <div className="avatar-wrapper">
        <Avatar 
          avatarUrl={`${players[game.allPlayerIds[0]].avatarUrl}`} 
          playerName={`${players[game.allPlayerIds[0]].displayName}`}
          animal="black-widow"

        />      
        <Avatar 
          avatarUrl={`${players[game.allPlayerIds[1]].avatarUrl}`}  
          playerName={`${players[game.allPlayerIds[1]].displayName}`}
          animal="komodo-dragon"

        />
        <Avatar 
          avatarUrl={`${players[game.allPlayerIds[2]].avatarUrl}`} 
          playerName={`${players[game.allPlayerIds[2]].displayName}`}
          animal="poison-dart-frog"

        />
        <Avatar 
          avatarUrl={`${players[game.allPlayerIds[3]].avatarUrl}`} 
          playerName={`${players[game.allPlayerIds[3]].displayName}`}
          animal="king-cobra"
        />
      </div>
      <PlayerCircle />
      <button 
        type="button" 
        onClick={() => {Rune.actions.handleReadyButtonClick(myPlayerId)}}
        disabled={game.playersReady.includes(myPlayerId)}
        className={`green ${game.playersReady.length < 4 ? "" : "hidden"}`}
      >
        READY
      </button>
      <button 
        className={`spin-bottle ${game.playersReady.length < 4 ? "hidden" : ""}`}
        disabled={
          myPlayerId !== game.turnOrder[0] || game.allPlayers[myPlayerId].isDead
        } 
        type="button" 
        onClick={() => {
          Rune.actions.spinBottle(myPlayerId)
        }}
        ></button>
      <p>{game.playersReady.length < 4 ? "" : `It is ${game.turnOrder[0]}'s turn`}</p>
      <p>{typeof game.kissee === "string" && game.kissee.length > 0 && `The bottle pointed to ${game.kissee}, who was kissed and then died`}</p>
    </>
  )
}

export default App
