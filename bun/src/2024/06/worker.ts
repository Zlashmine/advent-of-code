import MultiThreadedPuzzle, { WorkerInput } from './06-multithreaded'

declare var self: Worker

self.onmessage = (event: MessageEvent<WorkerInput>): void => {
  const { input, chunk } = event.data

  const puzzle = new MultiThreadedPuzzle()
  puzzle.setInput(input.input)

  let count = 0
  for (const position of chunk) {
    puzzle.runWithObstruction(position) && count++
  }

  postMessage(count)
}
