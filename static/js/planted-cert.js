
let canvas = document.getElementById('planted-cert-canvas');
let ctx = canvas.getContext('2d');

let WIDTH = canvas.width,
    HEIGHT = canvas.height;

let username = canvas.dataset.username,
    city = canvas.dataset.city;

console.log(username, city)

ctx.beginPath()
ctx.fillStyle = "#2e8";
ctx.rect(0, 0, WIDTH, 40)
ctx.fill()
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = "#2e8";
ctx.rect(0, 40, 40, HEIGHT);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = "#2e8";
ctx.rect(40, HEIGHT - 40, WIDTH, 40);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = "#2e8";
ctx.rect(WIDTH - 40, 0, 40, HEIGHT);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = "#ae2";
ctx.rect(50, 50, WIDTH - 100, 5);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = "#ae2";
ctx.rect(50, 50, 5, HEIGHT - 100);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = "#ae2";
ctx.rect(50, HEIGHT-50, WIDTH - 100, 5);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = "#ae2";
ctx.rect(WIDTH-50, 50, 5, HEIGHT-100);
ctx.fill();
ctx.closePath();

ctx.font = "60px Comic Sans Ms";
ctx.fillStyle = "#2e8";
ctx.textAlign = "center";
ctx.fillText("Certificate", WIDTH/2, 140)

ctx.font = "30px Sans Serif";
ctx.textAlign = "center";
ctx.fillText("of Plantation", WIDTH/2, 180)

ctx.font = "20px Comic Sans";
ctx.fillStyle = "#4e7";
ctx.textAlign = "center";
ctx.fillText("This certifies that", WIDTH/2, 220)

ctx.font = "80px Montserrat";
ctx.fillStyle = "#222";
ctx.textAlign = "center";
ctx.fillText(username, WIDTH/2, 290)

ctx.font = "20px Comic Sans";
ctx.fillStyle = "#4e7";
ctx.textAlign = "center";
ctx.fillText(`has successfully accepted to plant`, WIDTH/2, 330);

ctx.font = "20px Comic Sans";
ctx.fillStyle = "#4e7";
ctx.textAlign = "center";
ctx.fillText(`at ${city}`, WIDTH/2, 350);

ctx.font = "80px Comic Sans";
ctx.fillStyle = "#111";
ctx.textAlign = "center";
ctx.fillText(`Thank You`, WIDTH/2, 500);







