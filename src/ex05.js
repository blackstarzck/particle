import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: Point 좌표에 매쉬 생성하기

export default function example() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.y = 1.5;
	camera.position.z = 4;
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	

	// Mesh
	const planeMesh = new THREE.Mesh(
		new THREE.PlaneGeometry(.3, .3),
		new THREE.MeshBasicMaterial({
			color: 'red',
			// side: THREE.DoubleSide
		})
	);

	// Points
	const sphereGeometry = new THREE.SphereGeometry(1, 8, 8);
	const positionArray = sphereGeometry.attributes.position.array;

	console.log(sphereGeometry)

	// let plane;
	for(let i = 0; i < positionArray.length; i += 3){
		let plane = planeMesh.clone();
		plane.position.x = positionArray[i];
		plane.position.y = positionArray[i + 1];
		plane.position.z = positionArray[i + 2];

		// plane.lookAt(0, 0, 0);

		scene.add(plane)
	};

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

		controls.update();

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// 이벤트
	window.addEventListener('resize', setSize);

	draw();
}
