import { toJS, observable, action, computed } from 'mobx';

const maxGrouped=10
const maxItems=20

export default class AppState {
  @observable items = []
  @observable grouped = []
  @computed get isRunning() {
    return this._isRunning
  }
  set isRunning(state) {
    this._isRunning = state
    if (!!window.EventSource) {
      if (this._isRunning) {
        if (this._eventSource) {
          this._eventSource.close()
          this.removeSourceListeners()
          this._eventSource = undefined
        }
        this._eventSource = new EventSource('https://jsdemo.envdev.io/sse')
        this.addSourceListeners()

      } else {
        if (this._eventSource) {
          this._eventSource.close()
          this.removeSourceListeners()
          this._eventSource = undefined
        }
      }
    } else {
      this._isRunning = false
    }
  }

  constructor() {
    this._isRunning = false
  }

  fillGrouped=function(oldGrouped, data) {
     let cts = {}
    oldGrouped.map(item => {
      cts[item.name] = item
    })
    data.map(row => {
      let fnd = oldGrouped.find(group => group.name == row.name)
      if (cts[row.name]) {
        let newItems=row.measurements.slice(0,maxGrouped)
        cts[row.name].measurements = newItems.concat(cts[row.name].measurements.slice(0, maxGrouped-newItems.length))
      } else {
        cts[row.name] = { name: row.name, unit: row.unit, measurements: row.measurements.slice(0,maxGrouped) }
      }
    })
    let ret = []
    Object.keys(cts).map(key => {
      ret.push(cts[key])
    })
    return ret
  }

  onSourceMessage = function (e) {
    let data = JSON.parse(e.data)
    this.items.replace(data.concat(toJS(this.items)).slice(0, maxItems))
    this.grouped.replace(this.fillGrouped(toJS(this.grouped), data))
  }
  onSourceOpen = function (e) {
    console.log("Connection was opened")
  }
  onSourceError = function (e) {
    if (e.readyState == EventSource.CLOSED) {
      console.log("Connection was closed")
    }
  }


  addSourceListeners = function () {
    this._eventSource.addEventListener('message', this.onSourceMessage.bind(this), false)
    this._eventSource.addEventListener('open', this.onSourceOpen.bind(this), false)
    this._eventSource.addEventListener('error', this.onSourceError.bind(this), false)
  }

  removeSourceListeners = function () {
    this._eventSource.removeEventListener('message', this.onSourceMessage)
    this._eventSource.removeEventListener('open', this.onSourceOpen)
    this._eventSource.removeEventListener('error', this.onSourceError)
  }



}
