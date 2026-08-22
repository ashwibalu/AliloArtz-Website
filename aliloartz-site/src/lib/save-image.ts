import { promises as fs } from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "public", "uploads");

function extFromType(type: string, fallbackName: string) {
  if (type.includes("png")) return ".png";
  if (type.includes("webp")) return ".webp";
  if (type.includes("gif")) return ".gif";
  if (type.includes("heic") || type.includes("heif") || fallbackName.toLowerCase().endsWith(".heic")) {
    return ".heic";
  }
  return ".jpg";
}

export async function saveArtworkImage(file: File) {
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.mkdir(uploadDir, { recursive: true });

  let ext = extFromType(file.type, file.name);
  let output = bytes;

  if (ext === ".heic") {
    const convert = (await import("heic-convert")).default;
    output = Buffer.from(
      await convert({
        buffer: bytes,
        format: "JPEG",
        quality: 0.86,
      }),
    );
    ext = ".jpg";
  }

  const name = `art-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  await fs.writeFile(path.join(uploadDir, name), output);
  return `/uploads/${name}`;
}
