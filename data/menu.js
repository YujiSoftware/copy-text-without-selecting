self.on('click', function(node, data){
  var text = getText(node.firstChild, data);
  if(text.length > 0){
    self.postMessage(text.trim());
    console.log(text.trim());
  }
});

function getText(node, lineSeparator){
  var text = "";
  while(node != null){
    if(node.nodeType == Node.TEXT_NODE){
      text += node.nodeValue.trim();
    }else if(node.nodeType == Node.ELEMENT_NODE){
      if(node.offsetWidth > 0 || node.offsetHeight > 0 || node.getClientRects().length > 0){
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
    
        if(node.nodeName == "BR" || window.getComputedStyle(node, null).display == "block"){
          text += lineSeparator;
        }
      }
    }

    node = node.nextSibling;
  }

  return text;
}