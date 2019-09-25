//Creates Random Icon for Search Button
var hash = Math.floor(Math.random() * 1001);

var icon = hashicon(String(hash), 50);

document.getElementById("icon").appendChild(icon);
