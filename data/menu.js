self.on('click', function(node, data){
    var text = getText(node.firstChild, data);
    if(text.length > 0){
        self.postMessage(text.trim());
        
        var rect = node.getBoundingClientRect();
        var frame = document.createElement("div");
        frame.style.position = "absolute";
        frame.style.top = (rect.top + window.scrollY) + "px";
        frame.style.left = (rect.left + window.scrollX) + "px";
        frame.style.width = (rect.width - 4) + "px";
        frame.style.height = (rect.height - 4) + "px";
        frame.style.border = "solid 2px gold";
        frame.style.borderRadius = "5px";
        frame.style.zIndex = "99999";
        document.body.appendChild(frame);
        
        $(frame).fadeIn(300, "swing").delay(500).fadeOut(500, "swing");
                
        console.log(text.trim());
    }
});
