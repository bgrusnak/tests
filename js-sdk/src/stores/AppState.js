import { observable, action } from 'mobx';
import axios from 'axios';

export default class AppState {
  @observable items;
  @observable item;

  constructor() {
    this.items = [];
    this.item = {};
  }

  async fetchData(pathname, id) {
    let { data } = await axios.get(
      `https://jsonplaceholder.typicode.com${pathname}`
    );

    console.log(data);

    data.length > 0 ? this.setData(data) : this.setSingle(data);
  }

  @action setData(data) {
    this.items = data;
  }

  @action setSingle(data) {
    this.item = data;
  }

  @action clearItems() {
    this.items = [];
    this.item = {};
  }

}
