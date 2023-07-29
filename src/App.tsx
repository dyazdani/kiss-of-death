import { useEffect, useState } from "react"
import "./App.css"
import { GameState } from "./logic.ts"
import { Players } from "rune-games-sdk/multiplayer"
import PlayerCircle from "./components/PlayerCircle.tsx"
import Avatar from "./components/Avatar.tsx"
import TurnArrows from "./components/TurnArrows.tsx"
import kiss from "./assets/kiss.mp3"
import backgroundMusic from "./assets/background-music.mp3"


function App() {
  const [game, setGame] = useState<GameState>()
  const [myPlayerId, setMyPlayerId] = useState("")
  const [players, setPlayers] = useState<Players>({})
  const [hasGameStarted, setHasGameStarted] = useState(false)

    //TODO: Get music to work
  // const music = new Audio(backgroundMusic);
  // const startMusic = () => {
  //   music.play();
  // }

  useEffect(() => {
      Rune.initClient({
        onChange: ({ action, newGame, yourPlayerId, players }) => {
          if (action && action.action === 'spinBottle') {
            const kissSound = new Audio(kiss);
            const startKiss = () => {
              kissSound.play();
            }
            startKiss();
          }

          if (!hasGameStarted) {
            const music = new Audio(backgroundMusic)
            const startMusic = () => {
              music.play();
            }
            startMusic();
            setHasGameStarted(true);
          }

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
    <>
      <h1>Kiss of Death</h1>
      <TurnArrows 
        player1={players[game.allPlayerIds[0]].playerId}
        player2={players[game.allPlayerIds[1]].playerId}
        player3={players[game.allPlayerIds[2]].playerId}
        player4={players[game.allPlayerIds[3]].playerId}
        currentTurnPlayer={game.turnOrder[0]}/>
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
      <PlayerCircle 
        allPlayersObject={game.allPlayers} 
        player1={players[game.allPlayerIds[0]].playerId}
        player2={players[game.allPlayerIds[1]].playerId}
        player3={players[game.allPlayerIds[2]].playerId}
        player4={players[game.allPlayerIds[3]].playerId}/>
  
      <button 
        className={`spin-bottle ${myPlayerId === game.turnOrder[0] ? "" : "hidden"}`}
        disabled={
          myPlayerId !== game.turnOrder[0] || game.allPlayers[myPlayerId].isDead
        } 
        type="button" 
        onClick={() => {
          Rune.actions.spinBottle(myPlayerId);
        }}
        ></button>
        <p className={`bottle-paragraph ${myPlayerId === game.turnOrder[0] ? "" : "hidden"}`}>Spin the bottle 💋</p>
    </>
  )
}

export default App
