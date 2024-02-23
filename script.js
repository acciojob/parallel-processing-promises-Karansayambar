//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download an image given its URL
function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
    img.src = image.url;
  });
}

// Event listener for the button click
btn.addEventListener("click", () => {
  // Create an array of promises for downloading images
  const imagePromises = images.map(image => downloadImage(image));

  // Use Promise.all to download all images in parallel
  Promise.all(imagePromises)
    .then((downloadedImages) => {
      // Clear previous content in the output div
      output.innerHTML = '';

      // Display each downloaded image on the webpage
      downloadedImages.forEach((image) => {
        output.appendChild(image);
      });
    })
    .catch((error) => {
      console.error(error.message);
    });
});

