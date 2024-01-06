import { load, html } from 'emmy-dom/dist/server.js'

export function app () {
  this.className = 'flex flex-col justify-center items-center w-full h-fit text-gray-800 gap-0 relative'

  this.useEffect(() => {
    this.querySelector('#cta').addEventListener('click', () => {
      this.querySelector('#about').scrollIntoView({ behavior: 'smooth' })
      console.log('clicked')
    })
  }, ['didMount'])

  return html`
    <img class="absolute top-[450px] lg:top-[320px] xl:scale-150 2xl:scale-[3] left-[50px]" src="sagrado_corazon.png" alt="Sagrado Corazón" width="100px">
    <section class="h-[900px] w-screen bg-cover bg-[url('https://2024.uottahack.ca/images/CompleteBackground.png')]">
      <article class="h-screen w-full flex flex-col justify-center items-center gap-6 text-white">  
        <h1 class="text-4xl sm:text-7xl md:text-[6rem] lg:text-[8rem] font-bold font-['Harabara'] drop-shadow-lg">
          uOttaHack 6 UC
        </h1>
        <p class="text-2xl md:text-4xl">
          1 a 3 de marzo, Campus San Joaquín UC
        </p>
        <button id="cta" class="bg-[#384DBF] text-white text-2xl md:text-4xl px-4 py-2 rounded-lg drop-shadow-lg w-[fit-content]">
          Ver más
        </button>
      </article>
    </section>
    <section class="h-screen w-screen flex flex-col justify-center items-center gap-4">
      <h2 id="about" class="text-4xl font-bold font-['Harabara'] text-[#384DBF]">Acerca del evento</h2>
      <p class="text-xl lg:text-2xl w-[80%]">
        uOttaHack UC es una hackatón para estudiantes universitarios, con sede en el campus San Joaquín UC.
      </p>
      <p class="text-xl lg:text-2xl w-[80%]">
        Durante 36 horas, podrás colaborar en proyectos innovadores, asistir a talleres educativos, establecer contactos con empresas y competir en desafíos que invitan a la reflexión.
      </p>  
    </section>
    <Gallery></Gallery>
  `
}

export const App = load(app, 'App')
