(function () {
    var metaKey;

    updateMetaKey();

    chrome.storage.onChanged.addListener(function (changes, areaName) {
        if (areaName == "sync") {
            updateMetaKey();
        }
    })

    document.addEventListener("click", function (event) {
        if ((event.altKey && metaKey == "Alt")
            || (event.ctrlKey && metaKey == "Ctrl")
            || (event.shiftKey && metaKey == "Shift")) {
            copyCommand(event.target);
            event.preventDefault();
        }
    }, false);

    function updateMetaKey() {
        chrome.storage.sync.get({
            metaKey: 'Alt',
        }, function (items) {
            metaKey = items.metaKey;
        });
    };

    function getText(node) {
        if (node.nodeType == Node.TEXT_NODE) {
            return getText(node.parentNode);
        }

        switch (node.nodeName.toUpperCase()) {
            case "INPUT":
            case "TEXTAREA":
                return node.value;
            case "SELECT":
                return Array.from(node.selectedOptions).map(o => o.innerText).join("\n")
        }

        return node.innerText;
    }

    function copyCommand(clickedElement) {
        var text = getText(clickedElement);
        copy(text);

        var rect = clickedElement.getBoundingClientRect();
        var frame = document.createElement("div");
        Object.assign(frame.style, {
            position: "absolute",
            margin: "initial",
            padding: "initial",
            background: "initial",
            top: (rect.top + window.scrollY) + "px",
            left: (rect.left + window.scrollX) + "px",
            width: (rect.width - 4) + "px",
            height: (rect.height - 4) + "px",
            border: "solid 2px gold",
            borderRadius: "5px",
            zIndex: "99999",
            pointerEvents: "none",
        });

        document.body.appendChild(frame);
        setTimeout(() => {
            frame.addEventListener("transitionend", (event) => {
                frame.remove();
            });
            frame.style.opacity = "0";
            frame.style.transition = "opacity ease-out 0.5s";
        }, 500);
    }

    async function copy(text) {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(text);
            return;
        }

        // fallback (for http)
        const textArea = document.createElement("textarea");
        textArea.style.cssText = "position: absolute; left: -100%;";
        try {
            document.body.appendChild(textArea);

            textArea.value = text;
            textArea.select()

            if (!document.execCommand("copy")) {
                console.error("Copy failed.");
            }
        } finally {
            document.body.removeChild(textArea);
        }
    }
})();
