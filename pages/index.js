import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Home() {
  const [boardWidth, setBoardWidth] = useState(400)

  useEffect(() => {
    // Load chess-trainer.js
    const script = document.createElement('script')
    script.src = '/chess-trainer.js'
    script.async = true
    document.body.appendChild(script)

    // Adjust board size based on window width
    const handleResize = () => setBoardWidth(Math.min(400, window.innerWidth - 20))
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div>
      <Head>
        <title>Chess Trainer</title>
        <link rel="stylesheet" href="https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.css" />
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script src="https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js"></script>
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
