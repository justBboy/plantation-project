
let canvas = document.getElementById('donate-cert-canvas');
let ctx = canvas.getContext('2d');

let WIDTH = canvas.width,
    HEIGHT = canvas.height;

let username = canvas.dataset.username,
    city = canvas.dataset.city,
    amount = canvas.dataset.amount;

let logo = new Image();
logo.src = globalFiles.logo;
logo.width = 50
logo.height = 50;

console.dir(logo)

logo.onload = () => {
    ctx.drawImage(logo, WIDTH/2 - 25, 80)
}


console.log(username, city, amount)

ctx.beginPath()
ctx.fillStyle = "#ddd";
ctx.rect(0, 0, WIDTH, HEIGHT);
ctx.fill();
ctx.closePath()

ctx.beginPath()
ctx.fillStyle = "#000050";
ctx.rect(0, 0, WIDTH, 40)
ctx.fill()
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = "#000050";
ctx.rect(0, 40, 40, HEIGHT);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = "#000050";
ctx.rect(40, HEIGHT - 40, WIDTH, 40);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = "#000050";
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

ctx.font = "64px Impact";
ctx.fillStyle = "#000050";
ctx.textAlign = "center";
ctx.fillText("Certificate", WIDTH/2, 180)

ctx.font = "30px Sans Serif";
ctx.textAlign = "center";
ctx.fillText("of Donation", WIDTH/2, 220)

ctx.font = "20px Comic Sans";
ctx.fillStyle = "#882";
ctx.textAlign = "center";
ctx.fillText("This certifies that", WIDTH/2, 250)

ctx.font = "80px Montserrat";
ctx.fillStyle = "#000050";
ctx.textAlign = "center";
ctx.fillText(username.toUpperCase(), WIDTH/2, 320)

ctx.font = "20px Comic Sans";
ctx.fillStyle = "#882";
ctx.textAlign = "center";
ctx.fillText(`has successfully funded ${amount} rupees for`, WIDTH/2, 350);

ctx.font = "20px Comic Sans";
ctx.fillStyle = "#882";
ctx.textAlign = "center";
ctx.fillText(`plantation in ${city}`, WIDTH/2, 380);

ctx.font = "80px Comic Sans";
ctx.fillStyle = "#111";
ctx.textAlign = "center";
ctx.fillText(`Thank You`, WIDTH/2, 500);







