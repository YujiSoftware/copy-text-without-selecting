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

function isInsideText(clickedNode, clickedEvent){
    var range = document.createRange();

    // 要素内のTextNodeについて繰り返し処理を行う
    var childNodes = clickedNode.childNodes;
    for (var i = 0; i < childNodes.length; i++) {
        var n = childNodes[i];
        if (n.nodeType == Node.TEXT_NODE) {
            // TextNodeのすべての文字を表す範囲を指定する
            var text = n.textContent;

            range.setStart(n, 0);
            range.setEnd(n, text.length);

            // TextNode内の各行の絶対座標を取得する。
            var rects = range.getClientRects();
            for (var j = 0; j < rects.length; j++) {
                var rect = rects[j];

                // 各行について座標と範囲を判定する
                if (rect.left <= clickedEvent.clientX && clickedEvent.clientX <= rect.right
                    && rect.top <= clickedEvent.clientY && clickedEvent.clientY <= rect.bottom) {
                    return true;
                }
            }
        } else if (n.nodeType == Node.DOCUMENT_NODE || n.nodeType == Node.ELEMENT_NODE){
            if(isInsideText(n, clickedEvent)){
                return true;
            }
        }
    }

    return false;
}