import { Image, MeshWobbleMaterial, OrbitControls, Plane, Scroll, ScrollControls, Text, TorusKnot, useScroll } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { Suspense, useLayoutEffect, useRef } from 'react'
import { Group } from 'three'
import SideToCenterImages from '../components/SideToCenterImages'
import PixelCar from '../models/PixelCar'
import '../styles/global.css'


export default function Index() {


  return (
    <main >
      <Canvas dpr={[ 1, 1.5 ]} >
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <ScrollControls
          pages={16}
          >
            <Scroll>
              <Images />
            </Scroll>
            
            <SideToCenterImages 
            images={['/images/studio-background.jpg','/images/studio-background.jpg','/images/studio-background.jpg']}
            range={[2/16, 2/16]}
            />
            
          </ScrollControls>
        </Suspense>
      </Canvas>
    </main>
  )
}


const Images = () => {
  const {width, height} = useThree((state) => state.viewport)
  const data = useScroll()
  const group = useRef<Group>()

  useFrame(() => {
    group.current.children[1].material.zoom = 1 + data.range(0, 1/16)
    group.current.children[2].rotation.set(0, 0.2 - data.range(0, 3/16)/2, 0.5 - data.range(0, 3/16)/2)
  })

  useLayoutEffect(() => {
    console.log(width)
  }, [width])

  return (
    <group ref={group} >
      <Text
      anchorX='left'
      color='red'
      strokeWidth={1}
      fontSize={0.5}
      position={[-width/3, -height/3, 1]}
      >
        <MeshWobbleMaterial color='red' attach='material' factor={0.1} speed={1} />
        PHOTO STUDIO
      </Text>
      <Image zoom={1.4} position={[0, 0, 0]} scale={[width, height, 1]} url='/images/studio-background.jpg' />
      <Image position={[width/3, -height*1.5, -2]} scale={height}  url='/images/teens-blue.jpg' />
      <Image position={[-width/2, -height*3, -2]}  scale={5} url='/images/elders-chair.jpg' />
      <Image position={[width/2, -height*4.5, -3]} scale={height} url='/images/emotions.jpg' />
      <Image position={[-width/2, -height*6, -1]} scale={height} url='/images/women1.jpg' />
      <Image position={[width/2, -height*7, -4]}  scale={height} url='/images/vibin-grandpa.jpg' />
      <Image position={[1, -height*8, 0]} scale={height} url='/images/sleep.jpg' />
      <Plane position={[0, -height*5, -5]} args={[width, height, 20, 10]} scale={5} >
        <meshLambertMaterial color='black' />
      </Plane>
    </group>
  )
}


const Texts = () => {
  const { width, height } = useThree((state) => state.viewport)
  const data = useScroll()
  const group = useRef()

  useFrame(() => {

  })

  useLayoutEffect(() => {
    console.log(width, height)
  })

  return (
    <Scroll>
      <group ref={group}>
        <Text
        anchorX='left'
        color='white'
        strokeWidth={3}
        fontSize={1}
        position={[-width/2, 0, 0]}
        >
          JONAS
        </Text>
      </group>

    </Scroll>
  )
}

