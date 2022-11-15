import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(9, 0.8, 2, 32,);
const material = new THREE.MeshStandardMaterial({ color: 0x52A2FF, transparent: true, opacity: 0.75 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);
torus.rotation.x = 1;

// Lights

const pointLight = new THREE.PointLight(0x1020AF);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add( pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(60).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar

const myTexture = new THREE.TextureLoader().load('profile-pic.png');

const me = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: myTexture }));

scene.add(me);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');


const moon = new THREE.Mesh(
  new THREE.SphereGeometry(7, 32, 22),
  new THREE.MeshStandardMaterial({
    map: moonTexture,

  })
);

scene.add(moon);

moon.position.z = 40;
moon.position.setX(-10);

me.position.z = -5;
me.position.x = 1.50;
me.position.y = -0.25;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  /*
  moon.rotation.x += 0.001;
  moon.rotation.y += 0.001;
  moon.rotation.z += 0.005;
  */

  me.rotation.y += 0.01;
  me.rotation.z += 0.01;
  //me.position.x += 0.01;
  //torus.position.x += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.0;
  torus.rotation.y += 0.001;
  torus.rotation.z += 0.005;

  moon.rotation.x += 0.0005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();