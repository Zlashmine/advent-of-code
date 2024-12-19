export type PositionHandler = {
  visitedPoints: Set<string>
  onPositionVisited: (x: number, y: number) => boolean
}

export type PositionHandlerFunc = (
  point: string,
  previousPoint: string
) => boolean
