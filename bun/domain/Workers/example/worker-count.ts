declare var self: Worker

/**
 * This worker will count to a billion [countTimes] times
 * @param event The count times
 * @returns void
 */
self.onmessage = (event: MessageEvent<number>): void => {
  const countTimes = event.data

  let count = 0
  for (let i = 0; i < countTimes; i++) {
    for (let j = 0; j < 1e9; j++) {
      count++
    }
  }

  postMessage(count)
}
