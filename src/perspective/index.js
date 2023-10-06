import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";

//
const app = document.querySelector("#app");

//
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);
renderer.autoClear = false;

//
const scene = new THREE.Scene();

//
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(50, 0.5 * aspect, 1, 10000);
camera.position.set(500, 500, 2000);
camera.lookAt(0, 0, 0);

//
const cameraPerspective = new THREE.PerspectiveCamera(
  50,
  0.5 * aspect,
  1,
  3000
);
cameraPerspective.position.set(0, 500, 0);
const cameraPerspectiveHelper = new THREE.CameraHelper(cameraPerspective);
scene.add(cameraPerspective, cameraPerspectiveHelper);

//
const controls = new OrbitControls(cameraPerspective, renderer.domElement);
controls.enableZoom = true;
controls.minDistance = 10;
controls.maxDistance = 1000;

//
const groundGeometry = new THREE.PlaneGeometry(10000, 10000);
const groundMaterial = new THREE.MeshBasicMaterial({
  color: "navy",
  side: THREE.DoubleSide,
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.position.y = -0.01;
groundMesh.rotation.x = -Math.PI * 0.5;
scene.add(groundMesh);

//
const geometry = new THREE.SphereGeometry(5, 128, 128);
const material = new THREE.MeshNormalMaterial();
for (let i = 0; i < 30; i++) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = -i * 100;
  scene.add(mesh);
}
const sphereMesh = new THREE.Mesh(geometry, material);
sphereMesh.position.y = 100;
sphereMesh.scale.setScalar(5);
scene.add(sphereMesh);

//
function onWindowResize() {
  const aspect = window.innerWidth / window.innerHeight;

  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = 0.5 * aspect;
  camera.updateProjectionMatrix();

  cameraPerspective.aspect = 0.5 * aspect;
  cameraPerspective.updateProjectionMatrix();
}
window.addEventListener("resize", onWindowResize);

//
function animate() {
  requestAnimationFrame(animate);

  render();
  controls.update();
}

//
function render() {
  cameraPerspective.updateProjectionMatrix();
  cameraPerspectiveHelper.update();

  renderer.clear();

  renderer.setViewport(0, 0, window.innerWidth / 2, window.innerHeight);
  renderer.render(scene, cameraPerspective);

  renderer.setViewport(
    window.innerWidth / 2,
    0,
    window.innerWidth / 2,
    window.innerHeight
  );
  renderer.render(scene, camera);
}

animate();
