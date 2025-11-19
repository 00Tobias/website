"use strict";

import { createWindow } from "./window-manager.js";
import { updateTaskbar } from "./taskbar.js";

const createWindowList = { //     ID           Title            sW   sH  mW  mH
    // Desktop Icons
    welcome:   () => createWindow("welcome",   "Introduction",  58,  14, 34, 7),
    readme:    () => createWindow("readme",    "About Me",      89,  22, 38, 8),
    projects:  () => createWindow("projects",  "Projects",      62,  9,  38, 8),
    dragonfly: () => createWindow("dragonfly", "Dragonfly",     116, 38, 38, 8),
    frog:      () => createWindow("frog",      "frog",          26,  12, 26, 12),

    // About Me
    console:   () => createWindow("console",   "console",       33,  9,  20, 4),

    // Projects
    nightsrest: () => createWindow('nightsrest', 'nights.rest', 100, 30, 10, 6, "<iframe src='https://nights.rest/#welcome' width='100%' height='100%'></iframe>"),

    // Unlinked
    wheel:     () => createWindow("wheel",     "Pronoun Wheel", 55,  23, 35, 16),
};
window.createWindowList = createWindowList;

// A list of the current open windows
const openWindowList = {};
window.openWindowList = openWindowList;

function updateWindowStack() {
    const hash = window.location.hash.slice(1);
    if (hash) {
        try {
            createWindowList[hash]();
        } catch {
            console.log("Given window doesn't exist in createWindowList.");
        }
    }
}

if (!window.location.hash.slice(1)) {
    createWindowList["welcome"]();
}

updateWindowStack();
window.addEventListener("hashchange", updateWindowStack);

updateTaskbar(window.location.hash.slice(1));
window.addEventListener("hashchange", function() {
    updateTaskbar(window.location.hash.slice(1));
});
