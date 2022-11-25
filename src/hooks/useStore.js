import { nanoid } from 'nanoid';
import create from 'zustand';

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key))
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

export const useStore = create((set) => ({
    texture: 'dirt',
    cubes: getLocalStorage('cubes') || [],
    addCube: (x, y, z) => {
        set((prev) => ({
            cubes: [
                ...prev.cubes,
                {
                    key: nanoid(),
                    pos: [x, y, z],
                    texture: prev.texture
                }
            ],
        }))
    },
    removeCube: (x, y, z) => {
        // console.log('removeCube', x, y, z)
        set((prev) => ({
            cubes: prev.cubes.filter(cube => {
                const [cx, cy, cz] = cube.pos
                return cx !== x || cy !== y || cz !== z
            })
        }))
    },
    setTexture: (texture) => {
        set(() => ({ texture }))
    },
    saveWorld: () => {
        set((prev) => {
            setLocalStorage('cubes', prev.cubes)
            return prev
        })
        window.location.reload();
    },
    resetWorld: () => {
        set(() => ({
            cubes: []
        }))
        window.localStorage.removeItem('cubes')
        window.location.reload()
    },
}))
