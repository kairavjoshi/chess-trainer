import Head from 'next/head'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'

const ChessBoard = dynamic(() => import('react-chessboard'), { ssr: false })

export default function Home() {
  useEffect(() => {
    import('../chess-trainer.js')
  }, [])

  return (
    <div>
      <Head>
        <title>Chess Trainer</title>
      </Head>

      <main>
        <div id="board" style={{ width: '400px' }}></div>
        <p id="message"></p>
        <button id="startTraining">Start Training</button>
        <div id="stats">
          <p>Correct: <span id="correct">0</span></p>
          <p>Incorrect: <span id="incorrect">0</span></p>
        </div>
      </main>
    </div>
  )
}
