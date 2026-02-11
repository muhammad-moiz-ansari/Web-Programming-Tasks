
window.onload = function() {
    const canvas = document.getElementById("canvas-image");
    const context = canvas.getContext("2d");
    const img = new Image();

    img.src="default.png";
    img.cover = true;
    img.width = canvas.clientWidth;
    img.height = canvas.clientHeight;
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, canvas.clientWidth, canvas.clientHeight);
    }
}

