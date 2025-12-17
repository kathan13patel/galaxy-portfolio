import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Float, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import "./css/GalaxyBackground.css";

function AsteroidField() {
    const asteroids = useRef([]);

    const asteroidData = useMemo(() => {
        return Array.from({ length: 100 }).map(() => {
            const angle = Math.random() * Math.PI * 2;
            const radius = 15 + Math.random() * 11;

            return {
                position: [
                    Math.cos(angle) * radius,
                    (Math.random() - 0.5) * 20,
                    Math.sin(angle) * radius,
                ],
                scale: Math.random() * 0.18 + 0.07,
                rotationSpeed: {
                    x: Math.random() * 0.02,
                    y: Math.random() * 0.02,
                },
            };
        });
    }, []);

    useFrame((_, delta) => {
        asteroids.current.forEach((asteroid, i) => {
            if (!asteroid) return;
            asteroid.rotation.x += asteroidData[i].rotationSpeed.x * delta;
            asteroid.rotation.y += asteroidData[i].rotationSpeed.y * delta;
        });
    });

    return (
        <group>
            {asteroidData.map((data, i) => (
                <mesh
                    key={i}
                    ref={(el) => (asteroids.current[i] = el)}
                    position={data.position}
                    scale={data.scale}
                >
                    {/* Irregular rock geometry */}
                    <icosahedronGeometry
                        args={[1, 1]}
                        onUpdate={(geo) => {
                            const pos = geo.attributes.position;
                            for (let v = 0; v < pos.count; v++) {
                                const offset = (Math.random() - 0.5) * 0.25;
                                pos.setXYZ(
                                    v,
                                    pos.getX(v) + offset,
                                    pos.getY(v) + offset,
                                    pos.getZ(v) + offset
                                );
                            }
                            pos.needsUpdate = true;
                            geo.computeVertexNormals();
                        }}
                    />

                    {/* Rock-like material */}
                    <meshStandardMaterial
                        color={new THREE.Color().setHSL(
                            0.08,
                            0.12,
                            0.35 + Math.random() * 0.1
                        )}
                        roughness={0.95}
                        metalness={0.02}
                        flatShading
                    />
                </mesh>
            ))}
        </group>
    );
}

function Moon({ scrollRotation, moonTex }) {
    const ref = useRef();
    const orbit = useRef(0);

    useFrame((_, delta) => {
        orbit.current += delta * 0.4;              // orbit (time-based)
        ref.current.rotation.y = scrollRotation * 0.02; // axis spin only
        ref.current.position.set(
            Math.cos(orbit.current) * 2.5,
            0.15,
            Math.sin(orbit.current) * 2.5
        );
    });

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.35, 32, 32]} />
            <meshStandardMaterial map={moonTex} roughness={0.9} />
        </mesh>
    );
}

// Main Component
export default function GalaxyBackground() {
    const [scrollRotation, setScrollRotation] = useState(0);
    const [scrollDirection, setScrollDirection] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const lastScrollY = useRef(0);
    const animationRef = useRef(null);
    const scrollTimeoutRef = useRef(null);
    const [movingStars, setMovingStars] = useState([]);
    const [shootingStars, setShootingStars] = useState([]);

    const earthRef = useRef(null);

    const mercuryTex = useLoader(THREE.TextureLoader, "/textures/mercury.jpg");
    const venusTex = useLoader(THREE.TextureLoader, "/textures/venus.jpg");

    const earthDay = useLoader(THREE.TextureLoader, "/textures/earth_day.jpg");
    const earthNormal = useLoader(THREE.TextureLoader, "/textures/earth_normal.jpg");
    const earthClouds = useLoader(THREE.TextureLoader, "/textures/earth_clouds.png");
    const moonTex = useLoader(THREE.TextureLoader, "/textures/moon.jpg");
    earthDay.colorSpace = THREE.SRGBColorSpace;
    earthClouds.colorSpace = THREE.SRGBColorSpace;

    const marsTex = useLoader(THREE.TextureLoader, "/textures/mars.jpg");
    const jupiterTex = useLoader(THREE.TextureLoader, "/textures/jupiter.jpg");

    const saturnTex = useLoader(THREE.TextureLoader, "/textures/saturn.jpg");
    const saturnRing = useLoader(THREE.TextureLoader, "/textures/saturn_ring.png");

    const uranusTex = useLoader(THREE.TextureLoader, "/textures/uranus.jpg");
    const neptuneTex = useLoader(THREE.TextureLoader, "/textures/neptune.jpg");

    // Initialize 2D stars
    useEffect(() => {
        // Create moving stars with trajectories
        const stars = [];
        const starCount = 60;
        // const blinkers = [];
        // const blinkCount = 40;

        for (let i = 0; i < starCount; i++) {
            stars.push({
                id: i,
                startX: Math.random() * 100 - 50,
                startY: Math.random() * 100 - 50,
                endX: Math.random() * 100 + 100,
                endY: Math.random() * 100 + 100,
                size: Math.random() * 1.5 + 0.5,
                duration: Math.random() * 40 + 25,
                opacity: 0.2 + Math.random() * 0.5,
                delay: Math.random() * 30
            });
        }

        setMovingStars(stars);

        // Create shooting stars
        const shooters = [];
        for (let i = 0; i < 3; i++) {
            shooters.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                duration: Math.random() * 10 + 6,
                delay: Math.random() * 15,
                angle: Math.random() * 360
            });
        }
        setShootingStars(shooters);

        // Start rotation animation
        const animate = () => {
            setScrollRotation(prev => (prev + 0.15) % 360);
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    // Handle scroll for planet rotation
    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;
        const deltaY = scrollY - lastScrollY.current;

        if (Math.abs(deltaY) > 1) {
            setScrollDirection(deltaY > 0 ? 1 : -1);
        }

        lastScrollY.current = scrollY;

        const rotationDelta = deltaY * 0.25;
        setScrollRotation(prev => (prev + rotationDelta) % 360);

        setIsScrolling(true);

        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
        }, 200);
    }, []);

    useEffect(() => {
        let ticking = false;

        const throttledScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', throttledScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', throttledScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [handleScroll]);

    return (
        <>
            {/* 2D Background Elements */}
            <div className="galaxy-container">
                {/* Moving Starfield */}
                <div className="starfield" />
            </div>

            {/* 3D Planets Canvas */}
            <div className="canvas-3d">
                <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
                    {/* Space Background */}
                    <Stars radius={135} depth={0} count={15000} factor={6} saturation={0} fade speed={2} />

                    {/* Lighting */}
                    <ambientLight intensity={0.35} />
                    <directionalLight position={[8, 4, 6]} intensity={3} color="#ffffff" />
                    <pointLight position={[15, 15, 15]} intensity={1.2} color="#ffffff" />
                    <pointLight position={[-15, -15, -15]} intensity={0.4} color="#3b82f6" />
                    <pointLight position={[0, 0, 25]} intensity={5} color="#fbbf24" />

                    {/* Mercury */}
                    <Float speed={0.4} rotationIntensity={0.05} floatIntensity={0.2}>
                        <group position={[-15, -1, -4]} rotation={[0.01, scrollRotation * 0.004, 0]}>
                            <mesh>
                                <sphereGeometry args={[0.5, 48, 48]} />
                                <meshStandardMaterial map={mercuryTex} roughness={0.9} />
                            </mesh>
                        </group>
                    </Float>

                    {/* Venus */}
                    <Float speed={0.5} rotationIntensity={0.02} floatIntensity={0.25}>
                        <group position={[-13, 1.5, -3]} rotation={[0.02, scrollRotation * 0.002, 0]}>
                            <mesh>
                                <sphereGeometry args={[0.9, 48, 48]} />
                                <meshStandardMaterial map={venusTex} roughness={0.85} />
                            </mesh>
                        </group>
                    </Float>

                    {/* Earth */}
                    <Float speed={0.8} rotationIntensity={0.9} floatIntensity={0.25}>
                        <group position={[-10, 3, 0]} rotation={[0.41, scrollRotation * 0.008, 0]}>
                            {/* Earth Surface */}
                            <mesh ref={earthRef}>
                                <sphereGeometry args={[1.6, 64, 64]} />
                                <meshStandardMaterial
                                    map={earthDay}
                                    normalMap={earthNormal}
                                    normalScale={new THREE.Vector2(0.6, 0.6)}
                                    roughness={0.6}
                                    metalness={0.05}
                                />
                            </mesh>

                            {/* Clouds */}
                            <mesh>
                                <sphereGeometry args={[1.63, 64, 64]} />
                                <meshStandardMaterial
                                    map={earthClouds}
                                    transparent
                                    opacity={0.4}
                                    depthWrite={false}
                                    side={THREE.DoubleSide}
                                />
                            </mesh>

                            <Moon scrollRotation={scrollRotation} moonTex={moonTex} />
                        </group>
                    </Float>

                    {/* Mars */}
                    <Float speed={0.45} rotationIntensity={0.3} floatIntensity={0.25}>
                        <group position={[-8, -2, -2]} rotation={[0.44, scrollRotation * 0.006, 0]}>
                            <mesh>
                                <sphereGeometry args={[0.7, 48, 48]} />
                                <meshStandardMaterial map={marsTex} roughness={0.9} />
                            </mesh>
                        </group>
                    </Float>

                    {/* Jupiter */}
                    <Float speed={0.6} rotationIntensity={0.35} floatIntensity={0.3}>
                        <group position={[10, -2, -3]} rotation={[0.05, scrollRotation * 0.014, 0]}>
                            <mesh>
                                <sphereGeometry args={[2.8, 64, 64]} />
                                <meshStandardMaterial
                                    map={jupiterTex}
                                    metalness={0.1}
                                    roughness={0.9}
                                />
                            </mesh>
                        </group>
                    </Float>

                    {/* Saturn */}
                    <Float speed={0.5} rotationIntensity={0.4} floatIntensity={0.35}>
                        <group position={[0, 4, -6]} rotation={[0.47, scrollRotation * 0.010, 0]}>
                            <mesh>
                                <sphereGeometry args={[2.2, 64, 64]} />
                                <meshStandardMaterial
                                    map={saturnTex}
                                    roughness={0.8}
                                    metalness={0.3}
                                />
                            </mesh>

                            <mesh rotation={[Math.PI / 2, 0, 0]}>
                                <ringGeometry args={[2.7, 4.2, 128]} />
                                <meshBasicMaterial
                                    map={saturnRing}
                                    transparent
                                    opacity={0.8}
                                    side={THREE.DoubleSide}
                                    depthWrite={false}
                                />
                            </mesh>
                        </group>
                    </Float>

                    {/* uranus */}
                    <Float speed={0.3} rotationIntensity={0.08} floatIntensity={0.3}>
                        <group position={[14, 2, -8]} rotation={[Math.PI / 2, scrollRotation * 0.005, 0]}>
                            <mesh>
                                <sphereGeometry args={[1.6, 48, 48]} />
                                <meshStandardMaterial map={uranusTex} roughness={0.7} />
                            </mesh>
                        </group>
                    </Float>

                    {/* neptune */}
                    <Float speed={0.28} rotationIntensity={0.1} floatIntensity={0.3}>
                        <group position={[20, -1, -10]} rotation={[0.47, scrollRotation * 0.010, 0]}>
                            <mesh>
                                <sphereGeometry args={[1.5, 48, 48]} />
                                <meshStandardMaterial map={neptuneTex} roughness={0.75} />
                            </mesh>
                        </group>
                    </Float>

                    {/* Asteroid Field */}
                    <AsteroidField />

                    {/* Camera Controls */}
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        enableRotate={false}
                        autoRotate={true}
                        autoRotateSpeed={1.5}
                    />
                </Canvas>
            </div>
        </>
    );
}