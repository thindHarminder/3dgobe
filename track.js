<script type="importmap">{ "imports": { "three": "https://unpkg.com/three/build/three.module.js" }}</script>
  <script type="module">
    import { TrackballControls } from "https:///unpkg.com/three/examples/jsm/controls/TrackballControls.js";
    Object.assign(THREE , { TrackballControls });

    // Gen random data
    
    const N = 20;

    const arcsData = [...Array(N).keys()].map(() => ({
      startLat: (Math.random() - 0.5) * 180,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 180,
      endLng: (Math.random() - 0.5) * 360,
      color: ['#7C4BEC', '#D4C2FC'][Math.round(Math.random() * 3)]
    }));

    const Globe = new ThreeGlobe()
      .globeImageUrl('https://uploads-ssl.webflow.com/63b855e6f731d94be1d23ced/63e6bc3a35ce4da5d85cba4a_Frame%20312.svg')
      .arcsData(arcsData)
      .arcColor('color')
      .arcDashLength(0.4)
      .arcDashGap(4)
      .showAtmosphere([false])
      .arcDashInitialGap(() => Math.random() * 5)
      .arcDashAnimateTime(2000);
      

    // Setup renderer
    const renderer = new THREE.WebGLRenderer();
    
    const factor = 0.5; // percentage of the screen
    const w = window.innerWidth ;
    const h = window.innerHeight ;
    

    renderer.setSize(w,h );
    renderer.setClearColor( 0x000000, 0 );
    document.getElementById('globeViz').appendChild(renderer.domElement);

    // Setup scene
    const scene = new THREE.Scene();
    scene.add(Globe);
    scene.add(new THREE.AmbientLight(0xfff));
    scene.add(new THREE.DirectionalLight(0x4F3D78, 0.6));

    // Setup camera
    const camera = new THREE.PerspectiveCamera();
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    camera.position.z = 300;

    // Add camera controls
    const tbControls = new THREE.TrackballControls(camera, renderer.domElement);
    tbControls.minDistance = 101;
    tbControls.rotateSpeed = 5;
    tbControls.zoomSpeed = 0.8;

    // Kick-off renderer
    (function animate() { // IIFE
      // Frame cycle
      tbControls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    })();
  </script>
