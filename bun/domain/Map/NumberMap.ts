export class NumberMap<T> {
  private readonly map: Map<T, number> = new Map()

  public set(key: T, value: number): NumberMap<T> {
    this.map.set(key, value)

    return this
  }

  public increment(key: T, count?: number): NumberMap<T> {
    this.map.set(key, this.get(key) + (count || 1))

    return this
  }

  public get(key: T): number {
    return this.map.get(key) || 0
  }

  public has(key: T): boolean {
    return this.map.has(key)
  }

  public get size(): number {
    return this.map.size
  }

  public values(): number[] {
    return Array.from(this.map.values())
  }

  public clear(): void {
    this.map.clear()
  }

  [Symbol.iterator](): IterableIterator<[T, number]> {
    return this.map.entries()
  }
}
