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
    }

    if(node.nodeName != "SCRIPT" && isVisible(node)){
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
    }
    
    if(node.nodeName == "BR" || node.nodeName == "P" || node.nodeName == "LI"){
      text += lineSeparator;
    }

    node = node.nextSibling;
  }

  return text;
}

function isVisible(node){
  switch(node.nodeType){
    case Node.ELEMENT_NODE:
      return node.offsetWidth > 0 || node.offsetHeight > 0 || node.getClientRects().length > 0
    case Node.PROCESSING_INSTRUCTION_NODE:
    case Node.COMMENT_NODE:
    case Node.DOCUMENT_NODE:
    case Node.DOCUMENT_TYPE_NODE:
    case Node.DOCUMENT_FRAGMENT_NODE:
      return false;
    default:
      return true;
  }
}