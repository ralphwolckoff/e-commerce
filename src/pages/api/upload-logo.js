import fs from "fs/promises";
import path from "path";
import formidable from "formidable";

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

      const storeId = fields.storeId?.[0];

      if (!storeId) {
        return res.status(400).json({ error: "User ID is missing." });
      }

      const file = files.file?.[0];
      if (!file) {
        return res
          .status(400)
          .json({ error: "Aucun fichier n'a été uploadé." });
      }

      const uploadDir = path.join(
        process.cwd(),
        `/public/uploads/Store/${storeId}/logos`
      );
      const filePath = path.join(uploadDir, file.originalFilename);

      await fs.mkdir(uploadDir, { recursive: true });
      await fs.rename(file.filepath, filePath);

      return res.status(200).json({
        message: "Fichier uploadé avec succès.",
        newLogoUrl: `/uploads/Store/${storeId}/logos/${file.originalFilename}`,
      });
    } catch (error) {
      console.error("Erreur serveur lors de l'upload :", error);
      return res.status(500).json({ error: "Échec de l'upload." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
