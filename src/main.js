"use strict";

import { createWindow } from "./window-manager.js";
import { updateTaskbar } from "./taskbar.js";

// A list of window paramters to createWindow()
const createWindowList = {
    wheel: () => createWindow("wheel", "Pronoun wheel", 55, 23, 35, 16),
    readme: () => createWindow("readme", "readme", 89, 22, 38, 8),
    console: () => createWindow("console", "console", 33, 9, 20, 4),
    injured: () => createWindow("injured", "hope this helps :D", 26, 12, 26, 12),
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

updateWindowStack();
window.addEventListener("hashchange", updateWindowStack);

updateTaskbar(window.location.hash.slice(1));
window.addEventListener("hashchange", function() {
    updateTaskbar(window.location.hash.slice(1));
});
