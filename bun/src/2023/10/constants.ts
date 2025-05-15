import { IConnection, IPipe } from './types'

export const validConnections: IConnection[] = [
  {
    direction: 'south',
    validConnections: ['L', 'J', '|']
  },
  {
    direction: 'north',
    validConnections: ['7', 'F', '|']
  },
  {
    direction: 'east',
    validConnections: ['J', '7', '-']
  },
  {
    direction: 'west',
    validConnections: ['L', 'F', '-']
  }
]

export const pipeTypes: IPipe[] = [
  {
    symbol: '|',
    validConnections: [
      {
        direction: 'south',
        validConnections: ['L', 'J', '|']
      },
      {
        direction: 'north',
        validConnections: ['7', 'F', '|']
      }
    ]
  } as IPipe,
  {
    symbol: '-',
    validConnections: [
      {
        direction: 'east',
        validConnections: ['J', '7', '-']
      },
      {
        direction: 'west',
        validConnections: ['L', 'F', '-']
      }
    ]
  } as IPipe,
  {
    symbol: 'L',
    validConnections: [
      {
        direction: 'east',
        validConnections: ['J', '7', '-']
      },
      {
        direction: 'north',
        validConnections: ['7', 'F', '|']
      }
    ]
  } as IPipe,
  {
    symbol: 'J',
    validConnections: [
      {
        direction: 'west',
        validConnections: ['L', 'F', '-']
      },
      {
        direction: 'north',
        validConnections: ['7', 'F', '|']
      }
    ]
  } as IPipe,
  {
    symbol: '7',
    validConnections: [
      {
        direction: 'south',
        validConnections: ['L', 'J', '|']
      },
      {
        direction: 'west',
        validConnections: ['L', 'F', '-']
      }
    ]
  } as IPipe,
  {
    symbol: 'F',
    validConnections: [
      {
        direction: 'south',
        validConnections: ['L', 'J', '|']
      },
      {
        direction: 'east',
        validConnections: ['J', '7', '-']
      }
    ]
  } as IPipe,
  {
    symbol: 'S',
    validConnections: [
      {
        direction: 'east',
        validConnections: ['J', '7', '-']
      },
      {
        direction: 'south',
        validConnections: ['L', 'J', '|']
      },
      {
        direction: 'west',
        validConnections: ['L', 'F', '-']
      },
      {
        direction: 'north',
        validConnections: ['7', 'F', '|']
      }
    ]
  } as IPipe,
]
