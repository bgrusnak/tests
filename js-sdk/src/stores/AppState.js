import { toJS, observable, action, computed } from 'mobx';



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

  onSourceMessage = function (e) {
    let data = JSON.parse(e.data)
    this.items.replace(data.concat(toJS(this.items)).slice(0, 100))
    let currentGrouped = []
    data.map(row => {
      let fnd = currentGrouped.find(group => group.name == row.name)
      if (fnd) {
        fnd.measurements = fnd.measurements.concat(row.measurements)
        currentGrouped = currentGrouped.map(item => {
          return item.name == row.name ? fnd : item
        })
      } else {
        currentGrouped.push({ name: row.name, unit: row.unit, measurements:row.measurements })
      }
    })
    let grp = toJS(this.grouped)
    currentGrouped.map(row => {
      let fnd = grp.find(group => group.name == row.name)
      if (fnd) {
        fnd.measurements = fnd.measurements.concat(row.measurements)
        currentGrouped = currentGrouped.map(item => {
          return item.name == row.name ? fnd : item
        })
      } else {
        row.measurements = row.measurements.sort((a,b)=>{
          return b[0]-a[0]
        }).slice(0,100)
        grp.push({ name: row.name, unit: row.unit, measurements:row.measurements })
      }
    })
    this.grouped.replace(grp)
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
