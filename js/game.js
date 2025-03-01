const player = document.getElementById("player");
const gameContainer = document.getElementById("gameContainer");
let posX = 10;
const step = 10;
let isJumping = false;
const backgrounds = ["../assets/fondoMov1.png", "../assets/fondoMov2.png", "../assets/fondoMov3.png"];
let currentBackground = 0;

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (!isJumping) {
                isJumping = true;
                player.style.bottom = "50px";
                setTimeout(() => {
                    player.style.bottom = "10px";
                    isJumping = false;
                }, 300);
            }
            break;
        case "ArrowLeft":
            if (posX > 0) {
                posX -= step;
            } else if (currentBackground > 0) {
                currentBackground--;
                gameContainer.style.backgroundImage = `url('${backgrounds[currentBackground]}')`;
                posX = 380;
            }
            break;
        case "ArrowRight":
            if (posX < 380) {
                posX += step;
            } else if (currentBackground < backgrounds.length - 1) {
                currentBackground++;
                gameContainer.style.backgroundImage = `url('${backgrounds[currentBackground]}')`;
                posX = 10;
            }
            break;
        case " ":
            shoot();
            break;
    }
    player.style.left = posX + "px";
});

function shoot() {
    const bullet = document.createElement("div");
    bullet.classList.add("bullet");
    bullet.style.left = (posX + 30) + "px";
    bullet.style.bottom = "20px";
    gameContainer.appendChild(bullet);

    let bulletInterval = setInterval(() => {
        let bulletLeft = parseInt(bullet.style.left);
        if (bulletLeft >= 400) {
            clearInterval(bulletInterval);
            bullet.remove();
        } else {
            bullet.style.left = bulletLeft + 10 + "px";
        }
    }, 50);
}
