import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";

let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;
let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

let camera, scene, renderer, mesh;
let cameraRig, activeCamera, activeHelper;
let cameraPerspective, cameraOrtho;
let cameraPerspectiveHelper, cameraOrthoHelper;
let controls;
const frustumSize = 600;

init();
animate();

function init() {
  const app = document.querySelector("#app");

  scene = new THREE.Scene();

  //

  camera = new THREE.PerspectiveCamera(50, 0.5 * aspect, 1, 10000);
  camera.position.z = 2500;

  cameraPerspective = new THREE.PerspectiveCamera(50, 0.5 * aspect, 1, 1000);
  cameraPerspective.position.set(0, 300, 0);
  cameraPerspectiveHelper = new THREE.CameraHelper(cameraPerspective);
  scene.add(cameraPerspectiveHelper);

  //
  cameraOrtho = new THREE.OrthographicCamera(
    (0.5 * frustumSize * aspect) / -2,
    (0.5 * frustumSize * aspect) / 2,
    frustumSize / 2,
    frustumSize / -2,
    1,
    1000
  );
  cameraOrtho.position.set(0, 300, 0);
  cameraOrthoHelper = new THREE.CameraHelper(cameraOrtho);
  scene.add(cameraOrthoHelper);

  //

  activeCamera = cameraOrtho;
  activeHelper = cameraOrthoHelper;

  // counteract different front orientation of cameras vs rig

  cameraRig = new THREE.Group();

  cameraRig.add(cameraPerspective);
  cameraRig.add(cameraOrtho);

  scene.add(cameraRig);

  //
  // ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(ambientLight);

  // ground
  const groundGeometry = new THREE.PlaneGeometry(10000, 10000);
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.8,
    metalness: 0.2,
    side: THREE.DoubleSide,
  });
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.position.y = -0.01;
  groundMesh.rotation.x = -Math.PI * 0.5;
  scene.add(groundMesh);

  // spheres
  const geometry = new THREE.SphereGeometry(5, 128, 128);
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
  });
  for (let i = 0; i < 30; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -i * 100;
    scene.add(mesh);
  }

  // big sphere
  const sphereMesh = new THREE.Mesh(geometry, material);
  sphereMesh.position.y = 100;
  sphereMesh.scale.setScalar(5);
  scene.add(sphereMesh);
  //

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  app.appendChild(renderer.domElement);

  renderer.autoClear = false;

  //
  controls = new OrbitControls(activeCamera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.enableRotate = true;
  controls.rotateSpeed = 0.3;
  controls.enableZoom = true;
  controls.zoomSpeed = 0.5;
  controls.minDistance = 10;
  controls.maxDistance = 1000;

  //

  window.addEventListener("resize", onWindowResize);
  document.addEventListener("keydown", onKeyDown);
}

//

function onKeyDown(event) {
  switch (event.keyCode) {
    case 79 /*O*/:
      activeCamera = cameraOrtho;
      activeHelper = cameraOrthoHelper;

      break;

    case 80 /*P*/:
      activeCamera = cameraPerspective;
      activeHelper = cameraPerspectiveHelper;

      break;
  }
}

//

function onWindowResize() {
  SCREEN_WIDTH = window.innerWidth;
  SCREEN_HEIGHT = window.innerHeight;
  aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  camera.aspect = 0.5 * aspect;
  camera.updateProjectionMatrix();

  cameraPerspective.aspect = 0.5 * aspect;
  cameraPerspective.updateProjectionMatrix();

  cameraOrtho.left = (-0.5 * frustumSize * aspect) / 2;
  cameraOrtho.right = (0.5 * frustumSize * aspect) / 2;
  cameraOrtho.top = frustumSize / 2;
  cameraOrtho.bottom = -frustumSize / 2;
  cameraOrtho.updateProjectionMatrix();
}

//

function animate() {
  requestAnimationFrame(animate);

  render();
  controls.update();
}

function render() {
  if (activeCamera === cameraPerspective) {
    cameraPerspectiveHelper.visible = true;

    cameraOrthoHelper.visible = false;
  } else {
    cameraOrtho.updateProjectionMatrix();

    cameraOrthoHelper.update();
    cameraOrthoHelper.visible = true;

    cameraPerspectiveHelper.visible = false;
  }

  renderer.clear();

  activeHelper.visible = false;

  renderer.setViewport(0, 0, SCREEN_WIDTH / 2, SCREEN_HEIGHT);
  renderer.render(scene, activeCamera);

  activeHelper.visible = true;

  renderer.setViewport(SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2, SCREEN_HEIGHT);
  renderer.render(scene, camera);
}
