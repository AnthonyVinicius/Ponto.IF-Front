import { mount } from 'cypress/vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

describe('App.cy.js', () => {
  it('playground', () => {
    const app = createApp(App)
    app.use(router)
    mount(app)
  })
})
