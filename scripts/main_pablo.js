window.onload = async function () {
  // Select all the img elements and the .image-info divs
  const images = Array.from(document.querySelectorAll("img"));
  const infoDivs = Array.from(document.querySelectorAll(".image-info"));

  // Fetch the blob of the first image and store its size
  let firstImageSize;
  try {
    const response = await fetch(images[0].src);
    const blob = await response.blob();
    firstImageSize = blob.size;
  } catch (error) {
    console.error(`Failed to load image info for ${images[0].src}:`, error);
  }

  for (let index = 0; index < images.length; index++) {
    const img = images[index];
    // Get the URL of the image
    const url = img.src;

    // Use the fetch API to get the image as a Blob object
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      // Get the size of the Blob object
      const size = blob.size;

      // Calculate the size difference with the first image
      const sizeDifference = size - firstImageSize;

      console.log(sizeDifference, firstImageSize, size);

      // Calculate the percentage reduction
      const reductionPercentage = (
        (sizeDifference / firstImageSize) *
        100
      ).toFixed(2);

      const altElement = document.createElement("p");
      altElement.textContent = `Alt text: ${img.alt}`;
      infoDivs[index].appendChild(altElement);

      const imageSize = document.createElement("p");
      imageSize.textContent = `Original size: ${(size / 1024).toFixed(2)} kB`;
      infoDivs[index].appendChild(imageSize);

      const reductionElement = document.createElement("p");
      reductionElement.textContent = `Reduction compared to original: ${reductionPercentage}%`;
      infoDivs[index].appendChild(reductionElement);

      const dimensionsElement = document.createElement("p");
      dimensionsElement.textContent = `Dimensions: ${img.width}x${img.height}`;
      infoDivs[index].appendChild(dimensionsElement);
    } catch (error) {
      console.error(`Failed to load image info for ${url}:`, error);
    }
  }
};
