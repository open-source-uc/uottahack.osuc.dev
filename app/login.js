import { load, html } from 'emmy-dom/dist/server.js'

export function login () {
  this.className = 'flex flex-col justify-center items-center text-center w-full h-fit text-gray-800 gap-0'

  return html`
    <form class="flex flex-col justify-center items-center text-center w-full h-fit text-gray-800 gap-0">
      <input class="w-[80%] h-[50px] rounded-lg border-2 border-gray-300" type="text" placeholder="Correo electrónico">
      <input class="w-[80%] h-[50px] rounded-lg border-2 border-gray-300" type="password" placeholder="Contraseña">
      <button class="w-[80%] h-[50px] rounded-lg bg-[#384DBF] text-white text-2xl md:text-4xl px-4 py-2 rounded-lg drop-shadow-lg">
        Iniciar sesión
      </button>
    </form>
  `
}

export const Login = load(login, 'Login')
