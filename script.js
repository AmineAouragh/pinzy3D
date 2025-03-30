import * as THREE from 'three' 
import { OrbitControls } from 'three/examples/jsm/Addons.js'

const w = window.innerWidth
const h = window.innerHeight 

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000) 
const renderer = new THREE.WebGLRenderer({ antialias: true }) 

renderer.setSize(w, h) 
document.body.appendChild(renderer.domElement)

renderer.toneMapping = THREE.ACESFilmicToneMapping 
renderer.outputColorSpace = THREE.LinearSRGBColorSpace

const earthGroup = new THREE.Group() 
scene.add(earthGroup)

camera.position.z = 10

const loader = new THREE.TextureLoader() 

const geometry = new THREE.IcosahedronGeometry(4, 12) 
const material = new THREE.MeshStandardMaterial({
    map: loader.load('./textures/8081_earthmap4k.jpg')
})

const earthMesh = new THREE.Mesh(geometry, material)
earthGroup.add(earthMesh)

const lightsMat = new THREE.MeshBasicMaterial({
    // transparent: true,
    // opacity: 0.6,
    map: loader.load('./textures/8081_earthlights4k.jpg'),
    blending: THREE.AdditiveBlending
})
const lightsMesh = new THREE.Mesh(geometry, lightsMat)

earthGroup.add(lightsMesh)

const sunLight = new THREE.DirectionalLight(0xffffff, 2.0)
sunLight.position.set(-2, 0.5, 1.5)
scene.add(sunLight)

new OrbitControls(camera, renderer.domElement)

function animate(){
    requestAnimationFrame(animate)
    earthMesh.rotation.y += 0.002
    lightsMesh.rotation.y += 0.002
    renderer.render(scene, camera)
}

animate()