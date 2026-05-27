import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { preloadMedia } from './mediaPreloader';

describe('MediaPreloader', () => {
  beforeEach(() => {
    // Mock Image
    vi.stubGlobal('Image', class {
      src = '';
      onload = null;
      onerror = null;
      constructor() {
        setTimeout(() => {
          if (this.onload) (this.onload as Function)();
        }, 10);
      }
    });

    // Mock Audio
    vi.stubGlobal('Audio', class {
      src = '';
      oncanplaythrough = null;
      onerror = null;
      constructor() {
        setTimeout(() => {
          if (this.oncanplaythrough) (this.oncanplaythrough as Function)();
        }, 10);
      }
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should successfully preload a list of images and audio files', async () => {
    const images = ['http://example.com/test1.gif', 'http://example.com/test2.gif'];
    const audios = ['http://example.com/audio1.mp3'];
    
    await expect(preloadMedia(images, audios)).resolves.not.toThrow();
  });
});
