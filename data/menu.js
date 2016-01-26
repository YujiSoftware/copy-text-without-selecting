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
        
        $(frame).fadeIn(200, "swing", function(){
            $(this).fadeOut(600, "swing", function(){
                this.remove(); 
            })
        });
                
        console.log(text.trim());
    }
});

function getText(node, lineSeparator){
    var text = "";
    while(node != null){
        if(node.nodeType == Node.TEXT_NODE){
            text += node.nodeValue.trim();
        }else if(node.nodeType == Node.ELEMENT_NODE){
            if($(node).is(':visible')){
                var childText = ""; 
                if(node.firstChild != null){
                    if(node.parentNode.nodeName == "SELECT" && node.nodeName == "OPTION"){
                        // Get selected option text only
                        if(node.parentNode[node.parentNode.selectedIndex] == node){
                            childText = getText(node.firstChild, lineSeparator);
                        }
                    }else{
                        childText = getText(node.firstChild, lineSeparator);
                    }
                }

                if(childText != ""){
                    text += childText;
                }

                if(node.nodeName == "BR" || window.getComputedStyle(node, null).display.indexOf("inline") === -1){
                    text += lineSeparator;
                }
            }
        }

        node = node.nextSibling;
    }

    return text.trim();
}