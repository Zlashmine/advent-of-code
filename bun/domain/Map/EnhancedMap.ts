export class EnhancedMap<K, V> extends Map<K, V> {
  private readonly map: Map<K, V> = new Map()

  public getOrSet(key: K, getValueFunc: () => V): V {
    if (this.map.has(key)) {
      return this.map.get(key)!
    }

    const value = getValueFunc()
    this.map.set(key, value)

    return value
  }

  public setIfNotExists(key: K, value: V): void {
    if (!this.map.has(key)) {
      this.map.set(key, value)
    }
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.map.entries()
  }
}
