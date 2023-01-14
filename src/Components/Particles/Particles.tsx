import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: "repulse",
                            parallax: {
                                enable: true,
                                force: 85,
                                smooth: 200
                            }
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 1,
                        },
                        repulse: {
                            distance: 0,
                            duration: 0.1,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    collisions: {
                        enable: false,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 0.5,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 0.2,
                            opacity_min: 0.5,
                            sync: false
                        }
                    },
                    shape: {
                        type: "image",
                        image: [{
                            "src": 'Images/particles/pokeball.png',
                        }, {
                            "src": 'Images/particles/bulbasaur.png',
                        }, {
                            "src": 'Images/particles/charmander.png',
                        }, {
                            "src": 'Images/particles/mew.png',
                        }, {
                            "src": 'Images/particles/pikachu.png',
                        }, {
                            "src": 'Images/particles/squirtle.png',
                        }]
                    },
                    size: {
                        value: { min: 10, max: 30 },
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            size_min: 1,
                            sync: false
                        }
                    },
                },
                detectRetina: true,
            }}
        />
    );
};

export default ParticlesBackground;