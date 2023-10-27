"use strict";

var windows = Array.from(document.getElementsByClassName("window"));

const charWidth = document.getElementById("title").getBoundingClientRect().width / document.getElementById("title").textContent.length;
const charHeight = document.getElementById("title").getBoundingClientRect().height;
const fontSize = window.getComputedStyle(document.getElementById("title"), null).getPropertyValue('font-size');

document.documentElement.style.setProperty("--char-width", charWidth + "px");
document.documentElement.style.setProperty("--char-height", charHeight + "px");

function fetchAndInjectHTML(url, targetDivId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const targetDiv = document.getElementById(targetDivId);
            // FIXME: https://developer.mozilla.org/en-US/docs/Web/API/Element/setHTML#browser_compatibility
            targetDiv.innerHTML = html;

            const scripts = targetDiv.querySelectorAll("script");

            scripts.forEach(script => {
                const newScript = document.createElement("script");

                const attributes = script.attributes;

                for (let i = 0; i < attributes.length; i++) {
                    const attributeName = attributes[i].name;
                    const attributeValue = attributes[i].value;
                    newScript.setAttribute(attributeName, attributeValue);
                }

                newScript.text = script.innerHTML;
                document.body.appendChild(newScript);
            });
        })
        .catch(error => console.error("Error fetching HTML:", error));
}

export function createWindow(windowId, windowTitle = windowId, startingWidth = 20, startingHeight = 10, minWidth = 18, minHeight = 5, content = null) {
    if (document.getElementById(windowId)) {
        raiseWindow(document.getElementById(windowId));
        return;
    }

    const windowDiv = document.createElement("div");
    windowDiv.className = "window";
    windowDiv.id = windowId;
    windowDiv.style.width = charWidth * startingWidth + "px";
    windowDiv.style.height = charHeight * startingHeight + "px";

    const windowTitlebarDiv = document.createElement("div");
    windowTitlebarDiv.className = "windowTitlebar";
    // yes, this is actually how i do it. it works alright
    windowTitlebarDiv.textContent = "-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------";

    const windowTitleDiv = document.createElement("div");
    windowTitleDiv.className = "windowTitle";
    windowTitleDiv.appendChild(document.createTextNode(windowTitle));
    windowTitlebarDiv.appendChild(windowTitleDiv);

    const windowControlsDiv = document.createElement("div");
    windowControlsDiv.className = "windowControls";
    windowTitlebarDiv.appendChild(windowControlsDiv);

    const windowMinimizeDiv = document.createElement("div");
    windowMinimizeDiv.className = "windowMinimizeButton";
    windowMinimizeDiv.appendChild(document.createTextNode("_"));
    windowMinimizeDiv.addEventListener("click", function(){ minimizeWindow(windowDiv);}, false);
    windowControlsDiv.appendChild(windowMinimizeDiv);

    const windowMaximizeDiv = document.createElement("div");
    windowMaximizeDiv.className = "windowMaximizeButton";
    windowMaximizeDiv.appendChild(document.createTextNode("^"));
    windowMaximizeDiv.addEventListener("click", function(){ maximizeWindow(windowDiv);}, false);
    windowControlsDiv.appendChild(windowMaximizeDiv);

    const windowCloseDiv = document.createElement("div");
    windowCloseDiv.className = "windowCloseButton";
    windowCloseDiv.appendChild(document.createTextNode("X"));
    windowCloseDiv.addEventListener("click", function(){ windowDiv.remove();}, false);
    windowControlsDiv.appendChild(windowCloseDiv);

    const windowContentDiv = document.createElement("div");
    windowContentDiv.className = "windowContent";
    windowContentDiv.id = windowDiv.id + "WindowContent";

    if (content) {
        windowContentDiv.innerHTML = content;
    } else {
        fetchAndInjectHTML("./" + windowId + ".html", windowDiv.id + "WindowContent");
    }

    const windowBottomDiv = document.createElement("div");
    windowBottomDiv.className = "windowBottom";
    windowBottomDiv.textContent = "\\----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------";

    const windowHandleDiv = document.createElement("div");
    windowHandleDiv.className = "windowHandle";
    windowHandleDiv.textContent = "/";
    windowBottomDiv.appendChild(windowHandleDiv);

    const windowLeftSideDiv = document.createElement("div");
    windowLeftSideDiv.className = "windowLeftSide";
    windowLeftSideDiv.textContent = "|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|";

    const windowRightSideDiv = document.createElement("div");
    windowRightSideDiv.className = "windowRightSide";
    windowRightSideDiv.textContent = "|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|";

    windowDiv.appendChild(windowTitlebarDiv);
    windowDiv.appendChild(windowLeftSideDiv);
    windowDiv.appendChild(windowContentDiv);
    windowDiv.appendChild(windowRightSideDiv);
    windowDiv.appendChild(windowBottomDiv);
    document.getElementById("windows").appendChild(windowDiv);

    // Create windows in the middle of the viewport, rounded to the character size
    windowDiv.style.left = Math.round(((window.innerWidth / 2) - (windowDiv.offsetWidth / 2)) / charWidth) * charWidth + "px";
    windowDiv.style.top = Math.round(((window.innerHeight / 2) - (windowDiv.offsetHeight / 2)) / charHeight) * charHeight + "px";

    window.location.hash = windowDiv.id;
    handleWindow(windowDiv, charWidth * minWidth, charHeight * minHeight);
}

function raiseWindow (windowDiv) {
    window.location.hash = windowDiv.id;
    if (windowDiv !== windowDiv.parentNode.lastElementChild) {
        document.getElementById("windows").appendChild(windowDiv);
    }
}


function minimizeWindow (windowDiv) {
    windowDiv.style.display = "none";
    // TODO: display: revert
}

var windowLeft = 0;
var windowTop = 0;
var windowWidth = 0;
var windowHeight = 0;
var windowMaximized = false;

function maximizeWindow (windowDiv) {
    if (windowMaximized) {
        windowDiv.style.left = windowLeft + "px";
        windowDiv.style.top = windowTop + "px";
        windowDiv.style.width = windowWidth + "px";
        windowDiv.style.height = windowHeight + "px";
        windowDiv.querySelector(".windowMaximizeButton").innerHTML = "^";
        windowMaximized = false;
    } else {
        // Save the original pos
        // TODO: Per window?
        windowLeft = windowDiv.offsetLeft;
        windowTop = windowDiv.offsetTop;
        windowWidth = windowDiv.offsetWidth;
        windowHeight = windowDiv.offsetHeight;
        windowDiv.style.left = "0px";
        windowDiv.style.top = "0px";
        windowDiv.style.width = "100vw";
        windowDiv.style.height = "calc(100vh - var(--char-height) * 2)";
        windowDiv.querySelector(".windowMaximizeButton").innerHTML = "v";
        windowMaximized = true;
    }
}

function handleWindow (window, minWidth, minHeight) {
    let isResizing = false;
    let isMoving = false;
    let offsetX, offsetY;

    window.addEventListener("mousedown", (e) => {
        if (e.button === 2) {
            isMoving = false;
            isResizing = false;
        } else if (e.target.closest(".windowControls") || e.target.closest(".windowContent")) {
            raiseWindow(window);
            isMoving = false;
            isResizing = false;
        } else if (e.target.classList.contains("windowHandle")) {
            raiseWindow(window);
            isResizing = true;
        } else {
            raiseWindow(window);
            isResizing = false;
            isMoving = true;
            offsetX = e.clientX - window.getBoundingClientRect().left;
            offsetY = e.clientY - window.getBoundingClientRect().top;
        }
    });

    window.addEventListener("dblclick", (e) => {
        if (! e.target.closest(".windowContent")) {
            raiseWindow(window);
            maximizeWindow(window);
        }
    });

    document.addEventListener("mousemove", (e) => {
        if (isResizing) {
            const newWidth = e.clientX - window.getBoundingClientRect().left;
            const newHeight = e.clientY - window.getBoundingClientRect().top;

            const snappedWidth = Math.round(newWidth / charWidth) * charWidth;
            const snappedHeight = Math.round(newHeight / charHeight) * charHeight;

            window.style.width = Math.max(snappedWidth, minWidth) + "px";
            window.style.height = Math.max(snappedHeight, minHeight) + "px";
        } else if (isMoving) {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;

            if (windowMaximized) {
                maximizeWindow(window);
                window.style.left = Math.round((e.clientX - (window.offsetWidth / 2)) / charWidth) * charWidth + "px";
                window.style.top = Math.round(e.clientY / charHeight) * charHeight + "px";
                offsetX = e.clientX - window.getBoundingClientRect().left;
                offsetY = e.clientY - window.getBoundingClientRect().top;
            } else {
                window.style.left = Math.round(newX / charWidth) * charWidth + "px";
                window.style.top = Math.round(newY / charHeight) * charHeight + "px";
            }
        }
    });

    document.addEventListener("mouseup", () => {
        isResizing = false;
        isMoving = false;
    });
}

windows.forEach(window => {
    handleWindow(window);
});
