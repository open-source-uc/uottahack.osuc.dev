import { build, javascript } from 'emmy-dom/dist/server.js'
import { app, App } from './app/index.js'
import { gallery } from './app/components/gallery.js'

build({
  app: App,
  template: 'template.html',
  generators: { app, gallery },
  dependencies: javascript`
    import { load, html } from 'emmy-dom'
  `
})
