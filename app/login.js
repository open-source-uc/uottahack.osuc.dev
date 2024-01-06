import { load, html } from 'emmy-dom/dist/server.js'

export function login () {
  this.className = 'flex flex-col justify-center items-center text-center w-full h-fit text-gray-800 gap-0'

  const [email, setEmail] = this.useState('')
  const [password, setPassword] = this.useState('')

  this.useEffect(() => {
    this.querySelector('#signin').addEventListener('submit', async (e) => {
      e.preventDefault()
      setEmail(e.target[0].value)
      setPassword(e.target[1].value)
      await signInWithEmail(email(), password())
    })
  }, ['didMount'])

  return html`
    <form class="flex flex-col justify-center items-center text-center w-full h-fit text-gray-800 gap-0" id="signin">
      <input class="w-[80%] h-[50px] rounded-lg border-2 border-gray-300" type="text" placeholder="Correo electrónico">
      <input class="w-[80%] h-[50px] rounded-lg border-2 border-gray-300" type="password" placeholder="Contraseña">
      <button class="w-[80%] h-[50px] rounded-lg bg-[#384DBF] text-white text-2xl md:text-4xl px-4 py-2 rounded-lg drop-shadow-lg" type="submit">
        Iniciar sesión
      </button>
    </form>
  `
}

export const Login = load(login, 'Login')
