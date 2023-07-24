import { createApp, provide } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import Parse from 'parse/dist/parse.min.js';

Parse.initialize('kanbanapp', 'dev');
Parse.serverURL = 'http://localhost:1337/parse';

/*Litle hack for add support for dot-notation in vue*/
const _internalFields = Object.freeze([
  'objectId',
  'id',
  'className',
  'attributes',
  'createdAt',
  'updatedAt',
  'then',
]);
const proxyHandler = {
  get(target, key, receiver) {
    const value = target[key];
    const reflector = Reflect.get(target, key, receiver);
    if (
      typeof value === 'function' ||
      key.toString().charAt(0) === '_' ||
      _internalFields.includes(key.toString())
    ) {
      return reflector
    }
    return receiver.get(key) ?? reflector;
  },

  set(target, key, value, receiver) {
    const current = target[key];
    if (
      typeof current !== 'function' &&
      !_internalFields.includes(key.toString()) &&
      key.toString().charAt(0) !== '_'
    ) {
      receiver.set(key, value);
    }
    return Reflect.set(target, key, value, receiver);
  },
};
class ParseVueObject extends Parse.Object {
  constructor(...args) {
    super(...args);
    return new Proxy(this, proxyHandler);
  }
}

const subclasses = ["Board","Workflow","Task","SubTask","Priority"]
for (const sub of subclasses) {
  Parse.Object.registerSubclass(sub, ParseVueObject);
}


const app = createApp(App)

app.use(createPinia())

app.provide('Parse', Parse);

app.use(router)

app.mount('#app')
