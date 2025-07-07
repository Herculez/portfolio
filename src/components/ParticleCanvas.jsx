import React, { useRef, useEffect } from 'react';

export const ParticleCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.style.backgroundColor = 'transparent';

        // Match size of parent (banner)
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        class Particle {
            constructor(effect) {
                this.effect = effect;
                this.radius = Math.floor(Math.random() * 5 + 4);
                this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
                this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
                this.vx = Math.random() * 1 - 0.5;
                this.vy = Math.random() * 1 - 0.5;
                this.pushX = 0;
                this.pushY = 0;
                this.friction = 0.95;
            }
            draw(context) {
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                context.fill();
            }
            update() {
                if (this.effect.mouse.pressed) {
                    const dx = this.x - this.effect.mouse.x;
                    const dy = this.y - this.effect.mouse.y;
                    const dist = Math.hypot(dx, dy);
                    const force = (this.effect.mouse.radius / dist) / 4;
                    if (dist < this.effect.mouse.radius) {
                        const angle = Math.atan2(dy, dx);
                        this.pushX += Math.cos(angle) * force;
                        this.pushY += Math.sin(angle) * force;
                    }
                }
                this.x += (this.pushX *= this.friction) + this.vx;
                this.y += (this.pushY *= this.friction) + this.vy;

                if (this.x < this.radius || this.x > this.effect.width - this.radius) {
                    this.vx *= -1;
                }
                if (this.y < this.radius || this.y > this.effect.height - this.radius) {
                    this.vy *= -1;
                }
            }
            reset() {
                this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
                this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
            }
        }

        class Effect {
            constructor(canvas, context) {
                this.canvas = canvas;
                this.context = context;
                this.width = canvas.width;
                this.height = canvas.height;
                this.particles = [];
                this.numberOfParticles = 300;
                this.createParticles();
                this.mouse = {
                    x: 0,
                    y: 0,
                    pressed: false,
                    radius: 100
                };

                canvas.addEventListener('mousedown', (e) => {
                    this.mouse.pressed = true;
                    this.mouse.x = e.offsetX;
                    this.mouse.y = e.offsetY;
                });
                canvas.addEventListener('mouseup', () => {
                    this.mouse.pressed = false;
                });
                canvas.addEventListener('mousemove', (e) => {
                    if (this.mouse.pressed) {
                        this.mouse.x = e.offsetX;
                        this.mouse.y = e.offsetY;
                    }
                });

                window.addEventListener('resize', () => {
                    this.canvas.width = canvas.offsetWidth;
                    this.canvas.height = canvas.offsetHeight;
                    this.width = this.canvas.width;
                    this.height = this.canvas.height;
                    this.setGradient();
                    this.particles.forEach(p => p.reset());
                });

                this.setGradient();
            }

            createParticles() {
                for (let i = 0; i < this.numberOfParticles; i++) {
                    this.particles.push(new Particle(this));
                }
            }

            setGradient() {
                const gradient = this.context.createLinearGradient(0, 0, this.width, this.height);
                gradient.addColorStop(0, 'white');
                gradient.addColorStop(0.5, 'magenta');
                gradient.addColorStop(1, 'blue');
                this.context.fillStyle = "grey";
                this.context.strokeStyle = 'white';
            }

            handleParticles(context) {
                this.connectParticles(context);
                this.particles.forEach(p => {
                    p.draw(context);
                    p.update();
                });
            }

            connectParticles(context) {
                const maxDist = 100;
                for (let a = 0; a < this.particles.length; a++) {
                    for (let b = a + 1; b < this.particles.length; b++) {
                        const dx = this.particles[a].x - this.particles[b].x;
                        const dy = this.particles[a].y - this.particles[b].y;
                        const dist = Math.hypot(dx, dy);
                        if (dist < maxDist) {
                            context.save();
                            context.globalAlpha = 1 - (dist / maxDist);
                            context.beginPath();
                            context.moveTo(this.particles[a].x, this.particles[a].y);
                            context.lineTo(this.particles[b].x, this.particles[b].y);
                            context.stroke();
                            context.restore();
                        }
                    }
                }
            }
        }

        const effect = new Effect(canvas, ctx);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            effect.handleParticles(ctx);
            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="particle-canvas"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    );
};
