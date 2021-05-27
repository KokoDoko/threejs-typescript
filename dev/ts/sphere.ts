import * as THREE from 'three'

export class Sphere {

    private x:number
    private y:number
    private mesh: THREE.Mesh

    constructor(x: number, y: number, scene: THREE.Scene){
        const geometry = new THREE.SphereGeometry(2, 32, 32)
        const material = new THREE.MeshStandardMaterial({ color: 0xffff00 })
        this.mesh = new THREE.Mesh(geometry, material)
        scene.add(this.mesh)
        this.mesh.position.x = x
        this.mesh.position.y = y
    }
}