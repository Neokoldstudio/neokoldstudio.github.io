(() => {
    const snowflakeSymbols = ['❄', '❅', '❆', '.'];
    const maxSnowflakes = 10;
    const snowflakes = [];
    const container = document.querySelector('.snowflakes');
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  
    window.addEventListener('mousemove', e => {
      // Use pageX/Y to account for any layout shifts (though clientX/Y is usually enough)
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
  
    function createSnowflake() {
      const el = document.createElement('div');
      el.classList.add('snowflake');
      el.textContent = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];
      container.appendChild(el);
  
      return {
        el,
        x: Math.random() * window.innerWidth,
        y: Math.random() * -window.innerHeight,
        speedY: Math.random() * 0.5 + 0.5,
        drift: (Math.random() - 0.5) * 0.5,
        wobble: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5
      };
    }
  
    function updateSnowflakes() {
      const width = window.innerWidth;
      const height = window.innerHeight;
  
      for (const flake of snowflakes) {
        flake.y += flake.speedY;
        flake.wobble += 0.05;
        const wobbleX = Math.sin(flake.wobble) * 1.5;
  
        // Repulsion
        const dx = flake.x - mouse.x;
        const dy = flake.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        const minDist = 100;
        let repulseX = 0, repulseY = 0;
  
        if (distSq < minDist * minDist) {
          const dist = Math.sqrt(distSq) || 0.01;
          const force = (minDist - dist) / minDist;
          repulseX = (dx / dist) * force * 5;
          repulseY = (dy / dist) * force * 5;
        }
  
        flake.x += flake.drift + wobbleX + repulseX;
        flake.y += repulseY;
  
        // Wrap X
        if (flake.x < 0) flake.x += width;
        if (flake.x > width) flake.x -= width;
  
        // Reset if off bottom
        if (flake.y > height) {
          flake.y = -10;
          flake.x = Math.random() * width;
          flake.wobble = Math.random() * 100;
        }
  
        flake.el.style.transform = `translate(${flake.x}px, ${flake.y}px) scale(${flake.size})`;
      }
  
      requestAnimationFrame(updateSnowflakes);
    }
  
    for (let i = 0; i < maxSnowflakes; i++) {
      snowflakes.push(createSnowflake());
    }
  
    updateSnowflakes();
  })();
  