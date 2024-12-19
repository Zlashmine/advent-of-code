export class HashTable<T> {
  private table: Array<[string, T][]>
  private size: number

  private constructor(size: number) {
    this.table = new Array(size).fill(null).map(() => [])
    this.size = size
  }

  public static create<T>(size: number): HashTable<T> {
    return new HashTable(size)
  }

  private hash(key: string): number {
    let hash = Bun.hash.murmur32v3(key)

    return hash % this.size
  }

  public set = (key: string, value: T): T => {
    const index = this.hash(key)

    const bucket = this.table[index] || []
    const existing = bucket.find(([k]) => k === key)

    if (existing) {
      existing[1] = value
    } else {
      bucket.push([key, value])
    }

    return value
  }

  public get = (key: string): T | undefined => {
    const index = this.hash(key)

    const bucket = this.table[index] || []
    const pair = bucket.find(([k]) => k === key)

    return pair ? pair[1] : undefined
  }

  public remove = (key: string): void => {
    const index = this.hash(key)

    const bucket = this.table[index] || []
    const pairIndex = bucket.findIndex(([k]) => k === key)

    if (pairIndex !== -1) {
      bucket.splice(pairIndex, 1)
    }
  }
}
