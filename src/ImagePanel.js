import { DoubleSide, Mesh, MeshBasicMaterial } from "three";



export class ImagePanel {
    constructor(info){
        const texture = info.textureLoader.load(info.imageSrc);
        const material = new MeshBasicMaterial({
            map: texture,
            side: DoubleSide // 양쪽이 다 보이게
        });

        this.mesh = new Mesh(info.geometry, material);
        this.mesh.position.set(info.x, info.y, info.z);
        this.mesh.lookAt(0, 0, 0);

        // Sphere 상태의 회전각으 저장해둠
        this.sphereRotationX = this.mesh.rotation.x;
        this.sphereRotationY = this.mesh.rotation.y;
        this.sphereRotationZ = this.mesh.rotation.z;

        info.scene.add(this.mesh)
    }
}