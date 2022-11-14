import { useSphere } from "@react-three/cannon"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Vector3 } from "three"
import { useKey } from "../hooks/useKey"

export const Player = () => {
    const actions = useKey()
    console.log('actions', Object.entries(actions).filter(([key, value]) => value))

    const { camera } = useThree()
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        position: [0, 1, 0]
    }))

    const pos = useRef([0, 0, 0])
    useEffect(() => {
        api.position.subscribe((p) => pos.current = p)
    }, [api.position])

    const vel = useRef([0, 0, 0])
    useEffect(() => {
        api.velocity.subscribe((v) => vel.current = v)
    }, [api.velocity])

    useFrame(() => {
        camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]))

        // api.velocity.set(0, 1, 0)
    })

    return (
        <mesh ref={ref}></mesh>
    )
}
