# terra

Deployed to GitHub Pages: https://grumd.github.io/terra/

![image](https://user-images.githubusercontent.com/5869818/224294324-7087d1b0-3ca9-4ae1-bddd-7f565bd7109c.png)

**terra** is a tiny proof-of-concept app that builds procedurally generated 3D terrain in the browser.

It uses a variation of a [Wave Function Collapse](https://robertheaton.com/2018/12/17/wavefunction-collapse-algorithm/) algorithm to create terrain.

For 3D rendering it uses a custom-built engine that render polygons as SVG elements in real-time.  
Why SVG for rendering and not Canvas? Just for fun and to show that it's possible :)

## Local build

`npm start` or `npm run build` + `npm run host`.
