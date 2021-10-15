import Base from './base'
import Component from './component'

const app = Base.createApp({})
app.use(Component)
app.mount('#app')
