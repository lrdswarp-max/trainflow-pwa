export async function preloadMedia(imageUrls: string[], audioUrls: string[]): Promise<void> {
  const imagePromises = imageUrls.map(url => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  });

  const audioPromises = audioUrls.map(url => {
    return new Promise<void>((resolve, reject) => {
      const audio = new Audio();
      audio.oncanplaythrough = () => resolve();
      audio.onerror = () => reject(new Error(`Failed to load audio: ${url}`));
      audio.src = url;
    });
  });

  await Promise.all([...imagePromises, ...audioPromises]);
}
