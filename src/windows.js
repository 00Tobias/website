"use strict";

import { createWindow } from "./window-manager.js";

const windows = {
    wheel: () => createWindow("wheel", "spin 2 win", 55, 23, 35, 16),
    readme: () => createWindow("readme", "readme", 89, 22, 38, 8),
    console: () => createWindow("console", "console", 33, 9, 20, 4),
    websiteSource: () => createWindow('websiteSource', 'Website Source', 100, 30, 10, 6, "<iframe src='https://git.sr.ht/~terra/website' width='100%' height='100%'></iframe>"),
};

window.windows = windows;

function render() {
    const hash = window.location.hash.slice(1);
    if (hash) {
        windows[hash]();
    }
}

window.addEventListener("hashchange", render);
render();
