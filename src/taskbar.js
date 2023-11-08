"use strict";

var oldWindowList = {};

export function updateTaskbar(id) {
    if (id in createWindowList) {
        if (!document.getElementById(`${id}Taskbar`)) {
            oldWindowList = { ...openWindowList };

            const taskbarEntries = document.getElementById("taskbarEntries");

            const taskbarEntry = document.createElement("div");
            taskbarEntry.className = "taskbarEntry";
            taskbarEntry.id = `${id}Taskbar`;
            taskbarEntry.innerHTML = "----------------";

            const taskbarEntryTitle = document.createElement("div");
            taskbarEntryTitle.className = "taskbarEntryTitle";
            taskbarEntryTitle.innerHTML = `${document.getElementById(`${id}Title`).textContent}`;
            taskbarEntry.appendChild(taskbarEntryTitle);

            const taskbarEntryLeft = document.createElement("div");
            taskbarEntryLeft.className = "taskbarEntryLeft";
            taskbarEntryLeft.innerHTML = "|<br>|";
            taskbarEntry.appendChild(taskbarEntryLeft);

            const taskbarEntryRight = document.createElement("div");
            taskbarEntryRight.className = "taskbarEntryRight";
            taskbarEntryRight.innerHTML = "|<br>|";
            taskbarEntry.appendChild(taskbarEntryRight);

            taskbarEntries.appendChild(taskbarEntry);

            taskbarEntry.addEventListener("mousedown", (e) => {
                window.location.hash = id;
                document.getElementById(id).style.display = "revert";
            });
        }
    }

    // If a window got closed, remove the taskbar entry
    document.getElementById(`${Object.keys(oldWindowList).find(id => !(id in openWindowList))}Taskbar`)?.remove();

    // Highlight the focused window
    Array.from(document.getElementsByClassName("taskbarEntry"))?.forEach((elm) => elm.classList.remove("taskbarActive"));
    document.getElementById(`${id}Taskbar`)?.classList.add("taskbarActive");
}
