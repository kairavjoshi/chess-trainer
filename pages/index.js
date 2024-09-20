import Head from 'next/head'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const ChessBoard = dynamic(() => import('react-chessboard'), { ssr: false })

export default function Home() {
  const [boardWidth, setBoardWidth] = useState(400)

  useEffect(() => {
    import('../chess-trainer.js')
    // Adjust board size based on window width
    const handleResize = () => setBoardWidth(Math.min(400, window.innerWidth - 20))
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div>
      <Head>
        <title>Chess Trainer</title>
      </Head>

      <main>
        <div id="board" style={{ width: `${boardWidth}px`, margin: '0 auto' }}></div>
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
