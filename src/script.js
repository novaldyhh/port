import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
document.addEventListener('contextmenu', event => event.preventDefault());
//Texture Loader
const textureLoader = new THREE.TextureLoader()
const texturesPic = textureLoader.load('/img/normalMap.png')
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry(.7, .2, 16, 100);
const sphereGeometry = new THREE.SphereBufferGeometry(.5, 64, 64)

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 1
material.roughness = 0.6
material.normalMap = texturesPic
material.color = new THREE.Color('#898585')

// Mesh
const sphere = new THREE.Mesh(sphereGeometry, material)
scene.add(sphere)

// Lights

// const pointLight = new THREE.PointLight('#0017FF', .2)
// pointLight.position.set(1, 4, 3)
// pointLight.intensity = 0.7

// scene.add(pointLight)

// const pointLight2 = new THREE.PointLight('#F700FF', 2)
// pointLight2.position.set(1, 4, 1)
// pointLight2.intensity = 0.7
// scene.add(pointLight2)

const pointLight3 = new THREE.PointLight('#FF0000', 2)
pointLight3.position.set(-1, 9, 1)
pointLight3.intensity = 0.7

scene.add(pointLight3)

// const pointHelper = new THREE.PointLightHelper(pointLight, 4)
// scene.add(pointHelper)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
// Array(200).fill().forEach(generateParticles)
document.addEventListener('mousemove', onDocumentMouseMove)
let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0
const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight / 2

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}
var particles

function generateParticles() {
    const particlesShape = new THREE.SphereGeometry(0.25, 30, 30)
    const particleMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
    particles = new THREE.Mesh(particlesShape, particleMaterial)
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000))
    particles.position.set(x, y, z)
    scene.add(particles)

}

const clock = new THREE.Clock()

const tick = () => {
    targetX = mouseX * .001
    targetY = mouseY * .001
    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()