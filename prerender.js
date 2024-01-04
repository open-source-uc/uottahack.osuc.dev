import { build, javascript } from 'emmy-dom/dist/server.js'
import { app, App } from './app/index.js'

build({
  app: App,
  template: 'template.html',
  generators: { app },
  dependencies: javascript`import { load, html } from 'emmy-dom';`
})
