import { Image, useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useLayoutEffect, useRef } from 'react'
import { Group } from 'three'


export default function SideToCenterImages({ images, range=[0, 1/3] }: { images: string[], range?: [x: number, y: number]}) {
    const group = useRef<Group>()
    const data = useScroll()
    const {width, height} = useThree((state) => state.viewport)

    const getYPosition = (idx: number) => {
        return (idx - 1) * (height/images.length)
    }

    useFrame((state, delta) => {
        group.current.children.forEach((g, i) => {
            const k = i % 2 == 0 ? 2 : -2
            g.position.setX(k *width * (data.range(...range) - 0.5))
        })
    })

    useLayoutEffect(() => {
        console.log(data)
    })

    return (
        <group ref={group}>
            {images.map((image, idx) => 
            <Image key={idx} position={[0, getYPosition(idx), 0]} scale={[width, height/images.length, 1]}  url={image} />)}
        </group>
    )
}