import { load, html } from 'emmy-dom/dist/server.js'

export function gallery () {
  this.className = 'flex flex-col justify-center items-center text-center w-[80%] h-fit text-gray-800 gap-0'
  const srcs = []
  const uottahackImgs = [1, 2, 3, 4]
  uottahackImgs.forEach(i => {
    srcs.push(`pics/uottahack5_${i}.webp`)
  })
  const hackathonImgs = [1, 2]
  hackathonImgs.forEach(i => {
    srcs.push(`pics/Imagen${i}.jpg`)
  })
  const codefestImgs = [77, 81, 75, 73, 75, 76, 78, 80, 71, 74, 79, 72]
  codefestImgs.forEach(i => {
    srcs.push(`pics/photo_51435864726061504${i}_y.jpg`)
  })

  return html`
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    ${
      srcs.map(src => {
        return html`
          <div class="rounded-lg">
            <img class="object-cover rounded-lg" src="${src}" alt="Previuos hackathons" loading="lazy">
          </div>
        `
      }).join('')
    }
    </div>
  `
}

load(gallery, 'Gallery')
