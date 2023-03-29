
const div = document.querySelector('.threejs');
const greenRadio = document.querySelector('input[value="green"]');
let mesh;
let material

// document.forms[0].addEventListener('change', (e) => {
//     mesh.material.color.set(e.target.value);
//   })
  
  window.addEventListener('resize', onWindowResize);
  
  function onWindowResize() {
  
    camera.aspect = div.clientWidth / div.clientHeight;
    camera.updateProjectionMatrix();
  
    renderer.setSize(div.clientWidth, div.clientHeight);
    //renderer.shadowMap.enabled = true;
  
  }

  
  
  const clock = new THREE.Clock();
  
const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, div.clientWidth / div.clientHeight, 0.1, 1000);
  camera.position.set(3, 0.9, 3);
cameraTarget = new THREE.Vector3(0, 0.4, 0);

  //cameraTarget = new THREE.Vector3(0, 1, 0);
  
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(div.clientWidth, div.clientHeight);
  
  div.appendChild(renderer.domElement);

  renderer.shadowMapEnabled = true;

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowmap
  
  scene.background = new THREE.Color('#E6F8FB');
  scene.fog = new THREE.Fog('#E6F8FB', 1, 5);

//ПЛОСКОСТЬ ДЖИОМЕТРИ
  const bgGeometry = new THREE.BufferGeometry();
const bgVertices = new Float32Array([
-2, -2, 0,
-2, 2, 0,
2, -2, 0,
2, 2, 0,
]);
const bgIndices = new Uint16Array([0, 1, 2, 2, 1, 3]);
bgGeometry.setAttribute('position', new THREE.BufferAttribute(bgVertices, 3));
bgGeometry.setIndex(new THREE.BufferAttribute(bgIndices, 1));
const bgMaterial = new THREE.MeshPhongMaterial({color: 0xFFFF8C});
const bg = new THREE.Mesh(bgGeometry, bgMaterial);
bgGeometry.computeVertexNormals();
bg.castShadow=true;
  bg.receiveShadow=true;
scene.add(bg);

//ПЛОСКОСТЬ ОБЫЧНАЯ
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshPhongMaterial({color: 0x92DAE5, dithering: true });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;

//plane.castShadow=true;
  plane.receiveShadow=true;
scene.add(plane);

//КУБ
const cubeGeometry = new THREE.BoxGeometry();
material = new THREE.MeshPhongMaterial({color: 0xD5A6BD});
const cube = new THREE.Mesh(cubeGeometry, material);
cube.position.set(0, 0, -0.6);
cube.scale.set(0.6, 0.6, 0.6)
//material.shadowSide = THREE.FrontSide
cube.castShadow = true;
scene.add(cube);

 // ПИРАМИДА
var vertices = [
    0, 1, 0, // top vertex
    -1, 0, 1, // bottom-left vertex
    1, 0, 1, // bottom-right vertex
    1, 0, -1, // back-right vertex
    -1, 0, -1 // back-left vertex
    ];
    
    
    var faces = [
    0, 1, 2, // front face
    0, 2, 3, // right face
    0, 3, 4, // back face
    0, 4, 1, // left face
    1, 2, 3, // bottom face
    3, 4, 1 // base face
    ];
    
    
    var geometry = new THREE.BufferGeometry();
    
   
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    
    
    geometry.setIndex(faces);
    
    const pyramid = new THREE.Mesh(geometry, material);
    
    pyramid.position.set(0.7, 0, -0.5);
    pyramid.scale.set(0.3, 0.3, 0.3)

    geometry.computeVertexNormals();
    //material.shadowSide = THREE.FrontSide
    pyramid.castShadow=true;
    pyramid.receiveShadow=true;
    scene.add(pyramid);
    //material = new THREE.MeshBasicMaterial({ color: 0xD5A6BD });

    document.forms[0].addEventListener('change', (e)=> {
            material.color.set(e.target.value)
            renderer.render(scene, camera)
        //pyramid.style.borderBottomColor = 'green';
        })
    
    
    //СВЕТ

    
//Создание источника света directionalLight
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 10, -10);
directionalLight.castShadow = true;

directionalLight.shadow.mapSize.width = 2000; // default
directionalLight.shadow.mapSize.height = 2000; // default
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = - 10;
directionalLight.shadow.camera.left = - 10;
directionalLight.shadow.camera.right = 10;
scene.add(directionalLight);


const spotLight = new THREE.SpotLight("#ffffff");
spotLight.position.set(10, 1, -2);
spotLight.castShadow = true;
spotLight.intensity = 2;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 25;
spotLight.shadow.mapSize.width = 2048;
spotLight.shadow.mapSize.height = 2048;
spotLight.shadow.bias = -0.01;
spotLight.target.position.set(0, 0, 0);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLight);
scene.add(spotLight.target);
scene.add(spotLightHelper);

  camera.position.z = 5;
function animate() {

  requestAnimationFrame(animate);

  render();

}

function render() {

  const elapsedTime = clock.getElapsedTime()

  camera.position.x = Math.cos(elapsedTime * 0.5) * 2;
  camera.position.z = Math.sin(elapsedTime * 0.5) * 2;

  camera.lookAt(cameraTarget);

  renderer.render(scene, camera);

}
render();

 animate();