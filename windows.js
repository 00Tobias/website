"use strict";

import { createWindow } from "./window-manager.js";

const windows = {
    wheel: () => createWindow("wheel", "spin 2 win", 55, 23, 35, 16),
    readme: () => createWindow("readme", "About me", 88, 14, 88, 14),
};

window.windows = windows;

function render() {
    const hash = window.location.hash.slice(1);
    if (hash && !Array.from(document.getElementsByClassName("window")).some(e => e.id === hash)) {
        windows[hash]();
    }
}

window.addEventListener("hashchange", render);
render();

