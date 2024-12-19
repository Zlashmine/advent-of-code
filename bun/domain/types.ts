declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    last(): T
    addAtStartElseEnd(value: any, bool: boolean): T[]
    insert(index: number, ...items: any[]): T[]
    getFirstElseLast(bool: boolean): T
    removeByIndex(index: number): T[]
  }

  interface Object {
    getValues<T>(): Array<T>
    flatMapValues<T>(): Array<T>
  }
}

Array.prototype.last = function <T>(): Array<T> {
  return this[this.length - 1]
}

Array.prototype.insert = function <T>(
  index: number,
  ...items: any[]
): Array<T> {
  return this.splice(index, 0, ...items)
}

Array.prototype.removeByIndex = function <T>(index: number): Array<T> {
  return this.filter((_, i) => i !== index)
}

Array.prototype.addAtStartElseEnd = function <T>(
  value: any,
  bool: boolean
): Array<T> {
  return bool ? [value, ...this] : [...this, value]
}

Array.prototype.getFirstElseLast = function <T>(bool: boolean): Array<T> {
  return this[bool ? 'shift' : 'pop']()
}

Object.prototype.getValues = function <T>(): Array<T> {
  return Object.values(this)
}

Object.prototype.flatMapValues = function <T>(): Array<T> {
  return Object.values(this).flatMap(it => it as T)
}

export {}
