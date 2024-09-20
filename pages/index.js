import Head from 'next/head'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    import('/chess-trainer.js')
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
