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

      
      const userId = fields.userId?.[0];

      if (!userId) {
        return res.status(400).json({ error: "User ID is missing." });
      }

      const file = files.file?.[0];
      if (!file) {
        return res.status(400).json({ error: "No file was uploaded." });
      }

      
      const uploadDir = path.join(
        process.cwd(),
        `/public/uploads/users/${userId}/images`
      );
      const filePath = path.join(uploadDir, file.originalFilename);

      await fs.mkdir(uploadDir, { recursive: true });
      await fs.rename(file.filepath, filePath);

      return res.status(200).json({
        message: "File uploaded successfully.",
        newAvatarUrl: `/uploads/users/${userId}/images/${file.originalFilename}`,
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
