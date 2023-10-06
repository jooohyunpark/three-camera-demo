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
const frustumSize = 500;
const cameraOrthographic = new THREE.OrthographicCamera(
  (0.5 * frustumSize * aspect) / -2,
  (0.5 * frustumSize * aspect) / 2,
  frustumSize / 2,
  frustumSize / -2,
  0,
  3000
);

cameraOrthographic.position.set(0, 500, 0);
const cameraOrthographicHelper = new THREE.CameraHelper(cameraOrthographic);
scene.add(cameraOrthographic, cameraOrthographicHelper);

//
const controls = new OrbitControls(cameraOrthographic, renderer.domElement);
controls.enableZoom = true;

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

  cameraOrthographic.left = (-0.5 * frustumSize * aspect) / 2;
  cameraOrthographic.right = (0.5 * frustumSize * aspect) / 2;
  cameraOrthographic.top = frustumSize / 2;
  cameraOrthographic.bottom = -frustumSize / 2;
  cameraOrthographic.updateProjectionMatrix();
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
  cameraOrthographic.updateProjectionMatrix();
  cameraOrthographicHelper.update();

  renderer.clear();

  renderer.setViewport(0, 0, window.innerWidth / 2, window.innerHeight);
  renderer.render(scene, cameraOrthographic);

  renderer.setViewport(
    window.innerWidth / 2,
    0,
    window.innerWidth / 2,
    window.innerHeight
  );
  renderer.render(scene, camera);
}

animate();
