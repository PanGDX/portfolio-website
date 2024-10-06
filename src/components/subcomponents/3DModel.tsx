import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const Model: React.FC<{ url: string }> = ({ url }) => {
  const gltf = useLoader(GLTFLoader, url);
  const modelRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const scale = 2;
      modelRef.current.scale.set(scale, scale, scale);
      modelRef.current.position.sub(center.multiplyScalar(scale));
      modelRef.current.position.x += (size.x * scale) / 4;
      const maxDim = Math.max(size.x, size.y, size.z) * scale;
      const fov = camera.fov * (Math.PI / 180);
      const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
      camera.position.z = cameraZ * 1.5;
      camera.updateProjectionMatrix();
    }
  }, [gltf, camera]);
  // 



  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    }; // Set and normalize to -1 and 1

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  // Sets mousemove at the start of the render and then removes it at the end

  useFrame(() => {
    if (modelRef.current) {
      // Calculate the target position based on mouse movement
      const targetX = mousePosition.x * 2;
      const targetY = mousePosition.y * 2;

      // Smoothly interpolate the model's position
      modelRef.current.position.x += (targetX - modelRef.current.position.x) * 0.1;
      modelRef.current.position.y += (targetY - modelRef.current.position.y) * 0.1;

      // Make the model face the mouse
      modelRef.current.lookAt(new THREE.Vector3(mousePosition.x * 10, mousePosition.y * 10, 1));
    }
  });

  return <primitive object={gltf.scene} ref={modelRef} />;
};

const Scene: React.FC<{ modelUrl: string }> = ({ modelUrl }) => {
  return (
    <Canvas style={{ background: "transparent" }}>
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} />
      <Model url={modelUrl} />
    </Canvas>
  );
};

export default Scene;




/*

Option 1:
I need it to be centred at Y-axis. The box has to be centred Y. 
The X-axis, I want to be shifted to the right. 3/4.

I need it to be scaled.


Option 2:

I need it to be in a box and centred. Scale to fit the size. Remove the floor. How to remove the floor?



It also needs to handle when the page changes to be a phone/tablet.
Phone/Vertical tablet = no need for 3d
Horizontal tablet = 3D, slowly rotating
 */