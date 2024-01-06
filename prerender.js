import { build, javascript } from 'emmy-dom/dist/server.js'
import { app, App } from './app/index.js'
import { login, Login } from './app/login.js'
import { signup, Signup } from './app/signup.js'
import { gallery } from './app/components/gallery.js'

build({
  app: App,
  template: 'template.html',
  generators: { app, gallery },
  dependencies: javascript`
    import { load, html } from 'emmy-dom'
  `
})

build({
  app: Login,
  template: 'template.html',
  generators: { login },
  dependencies: javascript`
    import { load, html } from 'emmy-dom'
  `,
  path: 'login.html'
})

build({
  app: Signup,
  template: 'template.html',
  generators: { signup },
  dependencies: javascript`
    import { load, html } from 'emmy-dom'
    import { signUpNewUser } from './services/client.js'
  `,
  path: 'signup.html'
})
