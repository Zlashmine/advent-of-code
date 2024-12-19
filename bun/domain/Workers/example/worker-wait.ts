declare var self: Worker

/**
 * This worker will wait for a random time before sending the index back
 * @param event The index of the worker
 * @returns void
 */
self.onmessage = async (event: MessageEvent<number>) => {
  const index = event.data

  const randomTimeout = Math.floor(Math.random() * 1000 * index)

  setTimeout(() => {
    postMessage(index)
  }, randomTimeout)
}
