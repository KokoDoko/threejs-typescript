import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Sphere } from './sphere'

class Game {

    private scene: THREE.Scene
    private camera: THREE.Camera
    private renderer: THREE.Renderer
    private controls: OrbitControls
    private sphere: Sphere
    private cubes: THREE.Mesh[] = []

    constructor() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.z = 40

        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)

        const light = new THREE.AmbientLight(0x404040) // soft white light
        this.scene.add(light)

        const spotLight = new THREE.SpotLight(0xffffff)
        spotLight.position.set(100, 1000, 100)
        this.scene.add(spotLight)

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        for (let i = 0; i < 20; i++) {
            this.addCube()
        }
        this.sphere = new Sphere(0,0, this.scene)

        // plane, facing THREE.FrontSide, BackSide, DoubleSide
        const geometry = new THREE.PlaneGeometry(20, 20, 8, 8)
        const material = new THREE.MeshStandardMaterial({ color: 0x223388, side: THREE.DoubleSide })
        const plane = new THREE.Mesh(geometry, material)
        this.scene.add(plane)
        plane.rotation.x = 90

        this.gameLoop()
    }

    addCube() {
        // a cube
        const geometry = new THREE.BoxGeometry(2, 2, 2)
        const material = new THREE.MeshStandardMaterial({ color: 0x008833 })
        const cube = new THREE.Mesh(geometry, material)
        this.scene.add(cube)
        cube.rotation.x = Math.random() * 360
        cube.rotation.y = Math.random() * 360
        cube.rotation.z = Math.random() * 360
        this.cubes.push(cube)
    }

    gameLoop() {
        this.renderer.render(this.scene, this.camera)
        // cube.position.x += 0.01 // <- world position
        // translate // <- move forward to its own facing
        for (let cube of this.cubes) {
            cube.translateZ(0.01)
        }
        //sphere.rotation.x += 0.01

        // required if controls.enableDamping or controls.autoRotate are set to true
        // controls.update()

        requestAnimationFrame(() => this.gameLoop())
    }

}

new Game()