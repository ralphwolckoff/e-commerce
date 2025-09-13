import fs from "fs/promises";
import path from "path";
import formidable from "formidable";

const sanitizeFilename = (filename) => {
  if (!filename) {
    return "";
  }
  return filename
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/\s+/g, "-") 
    .replace(/[^a-z0-9-.]/g, ""); 
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const form = formidable();
      const [fields, files] = await form.parse(req);

      const userId = fields.userId?.[0];

      if (!userId) {
        return res.status(400).json({ error: "User ID is missing." });
      }

      const file = files.file?.[0];
      if (!file) {
        return res.status(400).json({ error: "No file was uploaded." });
      }

      // Nettoie le nom de fichier original
      const sanitizedFilename = sanitizeFilename(file.originalFilename);

      if (!sanitizedFilename) {
        return res.status(400).json({ error: "Invalid filename." });
      }

      const uploadDir = path.join(
        process.cwd(),
        `/public/uploads/users/${userId}/images`
      );
      // Utilise le nom de fichier normalisé pour sauvegarder le fichier
      const filePath = path.join(uploadDir, sanitizedFilename);

      await fs.mkdir(uploadDir, { recursive: true });
      await fs.rename(file.filepath, filePath);

      return res.status(200).json({
        message: "File uploaded successfully.",
        // Utilise le nom de fichier normalisé pour construire l'URL de l'image
        newAvatarUrl: `/uploads/users/${userId}/images/${sanitizedFilename}`,
      });
    } catch (error) {
      console.error("Server error during upload:", error);
      return res.status(500).json({ error: "Upload failed." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
