type fn = (...args: any[]) => any
interface IHandler {
  eventHandler: fn
  context: any
}
interface IEventBus {
  [key: string]: IHandler[]
}


export class EventBus {
  eventBus: IEventBus

  constructor() {
    this.eventBus = {}
  }

  on(eventName: string, eventHandler: fn, context?: any) {
    let handlers = this.eventBus[eventName]
    if (!handlers) {
      handlers = []
      this.eventBus[eventName] = handlers
    }
    handlers.push({ eventHandler, context })
    return this
  }

  once(eventName: string, eventHandler: fn, context?: any) {
    const onceCallback = (...payload: any[]) => {
      this.off(eventName, onceCallback)
      eventHandler.apply(context, payload)
    }

    return this.on(eventName, onceCallback, context)
  }

  emit(eventName: string, ...payload: any[]) {
    const handlers = this.eventBus[eventName]
    if (!handlers) {
      throw new Error(`${eventName} is not register`)
    }
    handlers.forEach(handler => {
      handler.eventHandler.apply(handler.context, payload)
    })
    return this
  }

  off(eventName: string, eventHandler: fn) {
    const handlers = this.eventBus[eventName]
    if (!handlers) {
      throw new Error(`${eventName} is not register`)
    }

    const newHandlers = handlers
    for (let i = 0; i < newHandlers.length; i++) {
      const handler = newHandlers[i]
      if (handler.eventHandler === eventHandler) {
        const index = handlers.indexOf(handler)
        handlers.splice(index, 1)
      }
    }

    if (handlers.length === 0) {
      delete this.eventBus[eventName]
    }

    return this
  }
}