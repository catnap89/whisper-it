
//Creates Random Icon for Search Button
const hash = Math.floor(Math.random() * 1001);

const icon = hashicon(String(hash), 50);

document.getElementById("icon").appendChild(icon);