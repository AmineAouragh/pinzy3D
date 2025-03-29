import * as THREE from 'three' 
import { OrbitControls } from 'three/examples/jsm/Addons.js'

const w = window.innerWidth
const h = window.innerHeight 

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000) 
const renderer = new THREE.WebGLRenderer() 

renderer.setSize(w, h) 
document.body.append(renderer.domElement)

camera.position.z = 8

const loader = new THREE.TextureLoader() 

const geometry = new THREE.SphereGeometry(5, 128, 128) 
const material = new THREE.MeshBasicMaterial({
    map: loader.load('/textures/8081_earthmap4k.jpg')
})

const earth = new THREE.Mesh(geometry, material)
scene.add(earth) 

const sunLight = new THREE.DirectionalLight(0xffffff, 2.0)
sunLight.position.set(-2, 0.5, 1.5)
scene.add(sunLight)

new OrbitControls(camera, renderer.domElement)

function animate(){
    requestAnimationFrame(animate)
    earth.rotation.y += 0.001 
    renderer.render(scene, camera)
}

animate()