self.onmessage = async function (e) {
    const { imgData, quality } = e.data;
    const img = new Image();
    img.src = imgData;
    img.onload = () => {
      const canvas = new OffscreenCanvas(img.width, img.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      canvas.convertToBlob({ type: 'image/jpeg', quality }).then(blob => {
        self.postMessage(blob);
      });
    };
    img.onerror = (error) => {
      self.postMessage({ error: error.message });
    };
  };
  