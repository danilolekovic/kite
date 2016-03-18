var elements = document.getElementsByTagName("kite");

function httpGet(address) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', address, false);
  xhr.send(null);

  if (xhr.status === 200) {
    return xhr.responseText;
  } else {
    throw "kite: Could not fetch file: " + address;
  }
}

for (var i = 0; i < elements.length; i++) {
  var src = "";

  if (elements[i].hasAttribute("src")) {
    if (elements[i].getAttribute("src").indexof(",") > -1) {
      files = elements[i].getAttribute("src").split(',');

      for (f in files) {
          str += httpGet(f);
      }
    } else {
      src += httpGet(elements[i].getAttribute("src"));
    }

    var htmlNode = document.createElement('span');
    htmlNode.innerHTML = src;
    elements[i].parentNode.replaceChild(htmlNode, elements[i]);
  } else {
    throw "kite: " + elements[i] + " has no src location.";
  }
}
