chooseBtn = document.querySelector(".choose-btn");
resetBtn = document.querySelector(".reset-btn");
saveBtn = document.querySelector(".save-btn");

const canvas = document.getElementById("canvas-image");
const context = canvas.getContext("2d");
const fileInput = document.getElementById("file-input")

let originalImage = new Image();

// Load default image
window.onload = function() {
    originalImage.src="default.png";
    originalImage.cover = true;
    originalImage.width = canvas.clientWidth;
    originalImage.height = canvas.clientHeight;
    originalImage.onload = function() {
        canvas.width = originalImage.width;
        canvas.height = originalImage.height;
        context.drawImage(originalImage, 0, 0, canvas.clientWidth, canvas.clientHeight);
    }

    chooseBtn.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                originalImage.src = event.target.result;
                
            }
            reader.readAsDataURL(file);
        }
    });
}

// Select Image
function selectImage() {
    fileInput.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function() {
                originalImage.src = reader.result;
                originalImage.onload = function() {
                    canvas.width = originalImage.width;
                    canvas.height = originalImage.height;
                    context.drawImage(originalImage, 0, 0, canvas.clientWidth, canvas.clientHeight);
                }
            }
            reader.readAsDataURL(file);
        }
    });
}