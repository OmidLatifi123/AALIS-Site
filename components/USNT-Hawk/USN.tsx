'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { hotspots, Hotspot } from './hotspots';

export default function USN() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const spheresRef = useRef<Map<string, THREE.Mesh>>(new Map());
  
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isUICollapsed, setIsUICollapsed] = useState(false);
  const [spheresVisible, setSpheresVisible] = useState(false);
  const targetCameraPos = useRef<THREE.Vector3 | null>(null);
  const originalCameraPos = useRef(new THREE.Vector3(5, 3, 5));
  const isAnimatingCamera = useRef(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 3, 5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-10, 5, -5);
    scene.add(directionalLight2);

    // Load GLB model
    const loader = new GLTFLoader();
    loader.load(
      '/3D/USNT-Hawk.glb',
      (gltf) => {
        const model = gltf.scene;
        
        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        
        // Scale if needed
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 7 / maxDim;
        model.scale.setScalar(scale);
        
        modelRef.current = model;
        scene.add(model);

        // Create all hotspot spheres from the imported array
        hotspots.forEach((hotspot) => {
          const sphereGeometry = new THREE.SphereGeometry(0.08, 32, 32);
          const sphereMaterial = new THREE.MeshBasicMaterial({ 
            color: hotspot.color,
            transparent: true,
            opacity: 0.5
          });
          const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
          sphere.position.set(...hotspot.position);
          sphere.userData = { hotspotId: hotspot.id };
          model.add(sphere);
          spheresRef.current.set(hotspot.id, sphere);
        });
      },
      (progress: ProgressEvent) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
      }
    );

    // Mouse interaction for rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

const onPointerMove = (e: PointerEvent) => {
      if (!isDragging || !modelRef.current) return;
      
      e.preventDefault(); // Prevent default touch behavior
      
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      
      modelRef.current.rotation.y += deltaX * 0.01;
      modelRef.current.rotation.x += deltaY * 0.01;
      
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    // Handle sphere clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onCanvasClick = (event: MouseEvent) => {
      if (!camera || spheresRef.current.size === 0) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const sphereArray = Array.from(spheresRef.current.values());
      const intersects = raycaster.intersectObjects(sphereArray);

      if (intersects.length > 0 && !activeHotspot) {
        const clickedSphere = intersects[0].object as THREE.Mesh;
        const hotspotId = clickedSphere.userData.hotspotId;
        const hotspot = hotspots.find(h => h.id === hotspotId);
        
        if (hotspot) {
          // Hide all spheres
          spheresRef.current.forEach((sphere) => {
            sphere.visible = false;
          });
          setActiveHotspot(hotspot);

          // Calculate world position of sphere
          const worldPos = new THREE.Vector3();
          clickedSphere.getWorldPosition(worldPos);
          
          // Set target camera position (zoom in)
          const offset = new THREE.Vector3(0, 0, 3);
          targetCameraPos.current = worldPos.clone().add(offset);
          isAnimatingCamera.current = true;
        }
      }
    };
renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('click', onCanvasClick);

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('click', onCanvasClick);
    
    // ADD THESE TWO LINES:
    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Animate camera zoom
      if (isAnimatingCamera.current && targetCameraPos.current) {
        camera.position.lerp(targetCameraPos.current, 0.05);
        
        // Look at center when returning to original position, otherwise look at target
        if (activeHotspot) {
          camera.lookAt(targetCameraPos.current.clone().sub(new THREE.Vector3(0, 0, 3)));
        } else {
          camera.lookAt(0, 0, 0);
        }
        
        if (camera.position.distanceTo(targetCameraPos.current) < 0.1) {
          isAnimatingCamera.current = false;
        }
      } else {
        // Always look at center when not animating
        camera.lookAt(0, 0, 0);
      }
      
      // Add pulsing animation to visible spheres
      spheresRef.current.forEach((sphere) => {
        // Update visibility based on state
        if (activeHotspot) {
          sphere.visible = false;
        } else {
          sphere.visible = spheresVisible;
        }
        
        // Only animate visible spheres
        if (sphere.visible) {
          const scale = 1 + Math.sin(Date.now() * 0.003) * 0.2;
          sphere.scale.setScalar(scale);
        }
      });
      
      renderer.render(scene, camera);
    };
    animate();

    // Mouse wheel zoom handler
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const zoomSpeed = 0.5;
      const delta = e.deltaY * 0.001;
      
      // Calculate zoom direction from camera to center
      const direction = new THREE.Vector3(0, 0, 0).sub(camera.position).normalize();
      const zoomAmount = delta * zoomSpeed;
      
      // Apply zoom by moving camera position
      camera.position.x -= direction.x * zoomAmount;
      camera.position.y -= direction.y * zoomAmount;
      camera.position.z -= direction.z * zoomAmount;
      
      // Prevent zooming too close or too far
      const distance = camera.position.length();
      if (distance < 1) {
        camera.position.setLength(1);
      } else if (distance > 20) {
        camera.position.setLength(20);
      }
    };

    renderer.domElement.addEventListener('wheel', handleWheel, { passive: false });

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('click', onCanvasClick);
      renderer.domElement.removeEventListener('wheel', handleWheel);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, [activeHotspot, spheresVisible]);

  // Update sphere visibility when toggle changes
  useEffect(() => {
    spheresRef.current.forEach((sphere) => {
      if (!activeHotspot) {
        sphere.visible = spheresVisible;
      } else {
        sphere.visible = false;
      }
    });
  }, [spheresVisible, activeHotspot]);

  const handleClose = () => {
    // Show all spheres again based on toggle state
    spheresRef.current.forEach((sphere) => {
      sphere.visible = spheresVisible;
    });
    
    setActiveHotspot(null);
    setIsUICollapsed(false);

    // Zoom back out
    if (cameraRef.current) {
      targetCameraPos.current = originalCameraPos.current.clone();
      isAnimatingCamera.current = true;
    }
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="w-full h-full" />
      
      {/* Toggle Spheres Button */}
      {!activeHotspot && (
        <button
          onClick={() => setSpheresVisible(!spheresVisible)}
          className="absolute top-4 left-4 px-4 py-2 rounded-lg text-white font-semibold transition-all"
          style={{
            background: 'rgba(20, 20, 20, 0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.3)'
          }}
        >
          {spheresVisible ? '👁️ Hide Hotspots' : '👁️‍🗨️ Show Hotspots'}
        </button>
      )}
      
      {activeHotspot && (
        <div 
          className={`absolute top-4 right-4 transition-all duration-300 ease-in-out rounded-2xl ${
            isUICollapsed ? 'w-12 h-12' : 'w-80'
          }`}
          style={{
            background: isUICollapsed ? 'rgba(20, 20, 20, 0.6)' : 'rgba(20, 20, 20, 0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Collapse/Expand Button */}
          <button
            onClick={() => setIsUICollapsed(!isUICollapsed)}
            className="absolute top-3 left-3 text-white p-1.5 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all z-10"
          >
            {isUICollapsed ? '▼' : '▲'}
          </button>

          {!isUICollapsed && (
            <div className="overflow-y-auto p-6 pt-12 max-h-[85vh]">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-white">{activeHotspot.title}</h2>
                <button
                  onClick={handleClose}
                  className="text-white hover:bg-white hover:bg-opacity-10 transition-all rounded-lg px-2 py-1 text-xl font-bold"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4 text-white text-sm">
                <div>
                  <h3 className="text-base font-semibold mb-2 text-white">Overview</h3>
                  <p className="text-white leading-relaxed opacity-90">
                    {activeHotspot.content.overview}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-base font-semibold mb-2 text-white">Specifications</h3>
                  <ul className="space-y-1.5 text-white opacity-90">
                    {activeHotspot.content.specifications.map((spec, index) => (
                      <li key={index}>
                        <span className="font-semibold">{spec.label}:</span> {spec.value}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-base font-semibold mb-2 text-white">Characteristics</h3>
                  <p className="text-white leading-relaxed opacity-90">
                    {activeHotspot.content.characteristics}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}