import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Loading
const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load("/textures/NormalMap.png");

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// Light 2

const pointLight2 = new THREE.PointLight(0xff0000, 2);
pointLight2.position.set(-1.86, 1, -1.65);
pointLight2.intensity = 5;
scene.add(pointLight2);

const light2 = gui.addFolder("Light 2");

light2.add(pointLight2.position, "y", -3, 3, 0.01);
light2.add(pointLight2.position, "x", -6, 6, 0.01);
light2.add(pointLight2.position, "z", -3, 3, 0.01);
light2.add(pointLight2, "intensity", 0, 10, 0.01);

const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 0.2);
scene.add(pointLightHelper2);

// Light 3

const pointLight3 = new THREE.PointLight(0x00ff00, 2);
pointLight3.position.set(1.33, -1.39, -1.65);
pointLight3.intensity = 5;
scene.add(pointLight3);

const light3 = gui.addFolder("Light 3");

light3.add(pointLight3.position, "y", -3, 3, 0.01);
light3.add(pointLight3.position, "x", -6, 6, 0.01);
light3.add(pointLight3.position, "z", -3, 3, 0.01);
light3.add(pointLight3, "intensity", 0, 10, 0.01);

const light3Color = { color: 0x00ff00 };
light3.addColor(light3Color, "color").onChange(() => {
  pointLight3.color.set(light3Color.color);
});

const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 0.2);
scene.add(pointLightHelper3);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

const onDocumentMouseMove = (ev) => {
  mouseX = ev.clientX - windowHalfX;
  mouseY = ev.clientY - windowHalfY;
};

document.addEventListener("mousemove", onDocumentMouseMove);

const updateSphere = (ev) => {
  sphere.rotation.z = -window.scrollY * 0.001;
};

window.addEventListener("scroll", updateSphere);

const clock = new THREE.Clock();

const tick = () => {
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  sphere.rotation.y = 0.5 * (targetX - sphere.rotation.y);
  sphere.rotation.x = -0.05 * (targetY - sphere.rotation.x);
  sphere.position.z = 0.5 * (targetY - sphere.rotation.x);

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
