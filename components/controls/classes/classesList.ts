import { StaticImageData } from "next/image"
import aqua from '../../../public/classes/aquatic.png'
import beast from '../../../public/classes/beast.png'
import bird from '../../../public/classes/bird.png'
import bug from '../../../public/classes/bug.png'
import dawn from '../../../public/classes/dawn.png'
import dusk from '../../../public/classes/dusk.png'
import mech from '../../../public/classes/mech.png'
import plant from '../../../public/classes/plant.png'
import reptile from '../../../public/classes/reptile.png'

type classList = [ name: string, image: StaticImageData ][]

export const classList = [
    ['Aquatic', aqua],
    ['Beast', beast],
    ['Bird', bird],
    ['Bug', bug],
    ['Dawn', dawn],
    ['Dusk', dusk],
    ['Mech', mech],
    ['Plant', plant],
    ['Reptile', reptile],
]