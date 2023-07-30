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

    function copyCommand(clickedElement) {
        var text = getText(clickedElement.firstChild, "\r\n");
        copy(text.trim());

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
            pointerEvents: "none"
        });

        document.body.appendChild(frame);

        $(frame).fadeIn(300, "swing").delay(500).fadeOut(500, "swing");
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
