import React, { useEffect, useRef, useState } from 'react';
import '../styles/ShoeModel3D.css';

let cachedShoeGLTF = null;
let cachedShoePromise = null;

const ShoeModel3D = () => {
  const containerRef = useRef(null);
  const initialisedRef = useRef(false);
  const [loading, setLoading] = useState(true);  // ← add this

  useEffect(() => {
    const container = containerRef.current;
    if (!container || initialisedRef.current) return;
    initialisedRef.current = true;

    let scene, camera, renderer, controls, animationId;
    let cleanupFn = null;

    const initScene = async () => {
      try {
        const [
          THREE,
          { GLTFLoader },
          { OrbitControls },
          { MeshoptDecoder },
        ] = await Promise.all([
          import('three'),
          import('three/examples/jsm/loaders/GLTFLoader.js'),
          import('three/examples/jsm/controls/OrbitControls.js'),
          import('three/examples/jsm/libs/meshopt_decoder.module.js'),
        ]);

        const getW = () => container.clientWidth  || 400;
        const getH = () => container.clientHeight || 400;

        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(getW(), getH());
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = false;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.8;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        container.appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(45, getW() / getH(), 0.1, 1000);
        camera.position.set(0, 0, 5);
        camera.lookAt(0, 0, 0);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping   = true;
        controls.dampingFactor   = 0.05;
        controls.enablePan       = false;
        controls.enableZoom      = true;
        controls.minDistance     = 2;
        controls.maxDistance     = 10;
        controls.autoRotate      = true;
        controls.autoRotateSpeed = 0.8;
        controls.target.set(0, 0, 0);
        controls.update();

        scene.add(new THREE.AmbientLight(0xffffff, 3));
        const key = new THREE.DirectionalLight(0xffffff, 4);
        key.position.set(3, 5, 5);
        scene.add(key);
        const fill = new THREE.DirectionalLight(0x8888ff, 2);
        fill.position.set(-5, 2, -3);
        scene.add(fill);
        const rim = new THREE.DirectionalLight(0xffffff, 3);
        rim.position.set(0, 5, -8);
        scene.add(rim);
        const bottom = new THREE.DirectionalLight(0xffffff, 1.5);
        bottom.position.set(0, -5, 0);
        scene.add(bottom);

        const setupModel = (gltf) => {
          scene.children.filter(c => c.isGroup).forEach(c => scene.remove(c));
          const group  = new THREE.Group();
          const cloned = gltf.scene.clone(true);
          cloned.scale.set(0.75, 0.75, 0.75);
          group.add(cloned);
          scene.add(group);
          group.updateMatrixWorld(true);
          const box    = new THREE.Box3().setFromObject(group);
          const centre = new THREE.Vector3();
          box.getCenter(centre);
          cloned.position.set(-centre.x, -centre.y, -centre.z);
          cloned.traverse((c) => {
            if (c.isMesh && c.material) {
              const mats = Array.isArray(c.material) ? c.material : [c.material];
              mats.forEach(m => {
                m.side = THREE.DoubleSide;
                if (m.emissive) m.emissive.set(0x111111);
                m.needsUpdate = true;
              });
            }
          });
          setLoading(false);  // ← hide loader once model is ready
        };

        const loader = new GLTFLoader();
        loader.setMeshoptDecoder(MeshoptDecoder);

        if (cachedShoeGLTF) {
          setupModel(cachedShoeGLTF);
        } else if (cachedShoePromise) {
          cachedShoePromise.then(setupModel);
        } else {
          cachedShoePromise = loader.loadAsync('/models/shoe.glb');
          cachedShoePromise.then((gltf) => { cachedShoeGLTF = gltf; setupModel(gltf); });
        }

        const handleResize = () => {
          camera.aspect = getW() / getH();
          camera.updateProjectionMatrix();
          renderer.setSize(getW(), getH());
        };
        const ro = new ResizeObserver(handleResize);
        ro.observe(container);

        const animate = () => {
          animationId = requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };
        animate();

        cleanupFn = () => {
          cancelAnimationFrame(animationId);
          ro.disconnect();
          controls.dispose();
          renderer.dispose();
          if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
          initialisedRef.current = false;
        };
      } catch (err) {
        initialisedRef.current = false;
        setLoading(false);
      }
    };

    initScene();
    return () => { if (cleanupFn) cleanupFn(); };
  }, []);

  return (
    <div className="shoe-model-container" ref={containerRef}>
      {loading && (
        <div className="shoe-model-loader">
          <div className="shoe-model-spinner" />
          <p>loading model...</p>
        </div>
      )}
    </div>
  );
};

export default ShoeModel3D;