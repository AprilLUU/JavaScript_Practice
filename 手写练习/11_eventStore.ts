import { EventBus } from "./09_eventBus"

type ActionFn = (state: IStateType, ...args: any[]) => void
type stateCallback = (...args: any[]) => void

interface IStateType {
  [key: string | symbol]: any
}

interface IActionType {
  [key: string | symbol]: ActionFn
}

interface IStoreOptions {
  state: IStateType
  actions: IActionType
}

export class EventStore {
  state: IStateType
  actions: IActionType
  eventBusV1: EventBus
  eventBusV2: EventBus

  constructor(options: IStoreOptions) { 
    this.state = this._observer(options.state ?? {})
    this.actions = options.actions ?? {}
    this.eventBusV1 = new EventBus()
    this.eventBusV2 = new EventBus()
  }

  _observer(state: IStateType) {
    return new Proxy(state, {
      get(target, key, recevier) {
        return Reflect.get(target, key, recevier)
      },
      set(target, key, newValue, recevier) {
        Reflect.set(target, key, newValue, recevier)
        if (this.eventBusV1.eventBus[key]) {
          this.eventBusV1.emit(key, newValue)
        }
        if (this.eventBusV2.eventBus[key]) {
          this.eventBusV2.emit(key, { [key]: newValue })
        }
        return true
      }
    })
  }

  onState(stateKey: string, stateCallback: stateCallback) {
    const keys = Object.keys(this.state)
    if (keys.indexOf(stateKey) === -1) {
      throw new Error("the state does not contain your key")
    }

    this.eventBusV1.on(stateKey, stateCallback)
    const value = this.state[stateKey]
    stateCallback.apply(this.state, [value])
  }

  onStates(stateKeys: string[], stateCallback: stateCallback) {
    const keys = Object.keys(this.state)
    const value = {}

    stateKeys.forEach((stateKey) => {
      if (keys.indexOf(stateKey) === -1) {
        throw new Error("the state does not contain your key")
      }
      this.eventBusV2.on(stateKey, stateCallback)
      value[stateKey] = this.state[stateKey]
    })

    stateCallback.apply(this.state, [value])
  }

  offState(stateKey: string, stateCallback: stateCallback) {
    const keys = Object.keys(this.state)
    if (keys.indexOf(stateKey) === -1) {
      throw new Error("the state does not contain your key")
    }
    this.eventBusV1.off(stateKey, stateCallback)
  }

  offStates(stateKeys: string[], stateCallback: stateCallback) {
    const keys = Object.keys(this.state)

    stateKeys.forEach((stateKey) => {
      if (keys.indexOf(stateKey) === -1) {
        throw new Error("the state does not contain your key")
      }

      this.eventBusV2.off(stateKey, stateCallback)
    })
  }

  setState(stateKey: string, value: any) {
    this.state[stateKey] = value
  }

  dispatch(actionName: string, ...payload: any[]) {
    const keys = Object.keys(this.actions)
    if (keys.indexOf(actionName) === -1) {
      throw new Error(`${actionName} is exsit on actions`)
    }

    const action = this.actions[actionName]

    action.apply(this.state, payload)
  }
}