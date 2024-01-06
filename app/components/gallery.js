import { load, html } from 'emmy-dom/dist/server.js'

export function gallery () {
  this.className = 'flex flex-col justify-center items-center text-center w-[80%] h-fit text-gray-800 gap-0'
  const srcs = []
  const imgs = [71, 74, 79, 73, 75, 76, 77, 78, 80, 81, 72]
  imgs.forEach(i => {
    srcs.push(`pics/photo_51435864726061504${i}_y.jpg`)
  })
  return html`
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    ${
        srcs.map(src => {
            return html`
                <div class="rounded-lg">
                    <img class="object-cover rounded-lg" src="${src}" alt="Codefest 2023">
                </div>
            `
        }).join('')
    }
    </div>
  `
}

load(gallery, 'Gallery')
