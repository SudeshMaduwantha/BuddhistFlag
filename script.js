document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("buddhistFlag");
    const context = canvas.getContext("2d");

    // Flag dimensions
    const width = canvas.width;
    const height = canvas.height;
    const bandWidth = width / 6;

    // Colors
    const colors = [
        "#0033cc", // Blue
        "#ffcc00", // Yellow
        "#ff3300", // Red
        "#ffffff", // White
        "#ff9933", // Orange
    ];

    // Function to draw each color band
    function drawBand(color, index, callback) {
        setTimeout(() => {
            context.fillStyle = color;
            context.fillRect(index * bandWidth, 0, bandWidth, height);
            if (callback) callback();
        }, index * 1000); // Delay in milliseconds
    }

    // Function to draw the combined color band
    function drawCombinedBand(callback) {
        const combinedColors = colors.concat(colors[0]);
        const combinedBandStart = 5 * bandWidth;
        const combinedBandHeight = height / 5;

        combinedColors.forEach((color, index) => {
            setTimeout(() => {
                context.fillStyle = color;
                context.fillRect(combinedBandStart, index * combinedBandHeight, bandWidth, combinedBandHeight);
                if (index === combinedColors.length - 1 && callback) {
                    callback();
                }
            }, index * 500); // Delay in milliseconds for each stripe in the combined band
        });
    }

    // Function to clear the canvas and start the drawing process
    function startDrawing() {
        context.clearRect(0, 0, width, height);

        // Draw each color band in sequence
        colors.forEach((color, index) => {
            drawBand(color, index, () => {
                // Once all bands are drawn, draw the combined band
                if (index === colors.length - 1) {
                    setTimeout(() => {
                        drawCombinedBand(() => {
                            // Restart the drawing process after a brief delay
                            setTimeout(startDrawing, 1000); // Delay before restarting
                        });
                    }, 1000); // Delay before starting the combined band
                }
            });
        });
    }

    // Start the drawing process
    startDrawing();
});
