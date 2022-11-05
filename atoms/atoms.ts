import { atom } from 'jotai'

type stringNull = string[] | null

export const partsAtom = atom<stringNull>(null)
export const classesAtom = atom<stringNull>(null)
