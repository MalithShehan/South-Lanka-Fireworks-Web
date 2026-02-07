import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join } from "path";

const ASSETS = "public/assets";

// Logo: displayed at 48x48 (2x = 96px), resize to 200px for quality
const LOGO_FILES = [
  { name: "SouthLankaFireworks.png", maxWidth: 200 },
  { name: "MainLogo.jpg", maxWidth: 200 },
];

// All JPG product/portfolio images → convert to WebP
const convertToWebP = async () => {
  const files = await readdir(ASSETS);
  const jpgs = files.filter((f) => f.endsWith(".jpg"));
  const pngs = files.filter(
    (f) =>
      f.endsWith(".png") &&
      !f.startsWith("icon-") &&
      f !== "invoice-bg.png"
  );

  for (const file of [...jpgs, ...pngs]) {
    const input = join(ASSETS, file);
    const webpName = file.replace(/\.(jpg|png)$/, ".webp");
    const output = join(ASSETS, webpName);

    const info = await stat(input);
    const isLogo = LOGO_FILES.find((l) => l.name === file);

    try {
      let pipeline = sharp(input);

      if (isLogo) {
        pipeline = pipeline.resize({ width: isLogo.maxWidth, withoutEnlargement: true });
      } else {
        // Resize large images to max 800px wide (plenty for mobile/card display)
        pipeline = pipeline.resize({ width: 800, withoutEnlargement: true });
      }

      await pipeline.webp({ quality: 80 }).toFile(output);

      const newInfo = await stat(output);
      const saved = ((1 - newInfo.size / info.size) * 100).toFixed(1);
      console.log(
        `✓ ${file} (${(info.size / 1024).toFixed(0)}KB) → ${webpName} (${(newInfo.size / 1024).toFixed(0)}KB) [${saved}% saved]`
      );
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`);
    }
  }
};

convertToWebP();
