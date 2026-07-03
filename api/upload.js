const REPO = "clcreation542-coder/Code-3D";
const ALLOWED_ORIGINS = ["https://kuztom.fr", "https://www.kuztom.fr"];

export default async function handler(req, res) {
  const origin = req.headers.origin || "";
  if (ALLOWED_ORIGINS.some((o) => origin.startsWith(o)) || origin.includes(".myshopify.com")) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { filename, content, message } = req.body;

    if (!filename || !content) {
      return res.status(400).json({ error: "Fichier ou contenu manquant" });
    }

    if (!filename.startsWith("orders/")) {
      return res.status(403).json({ error: "Chemin de fichier non autorisé" });
    }

    const githubRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${filename}`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${process.env.GITHUB_ORDERS_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github+json",
          "User-Agent": "kuztom-vercel-function",
        },
        body: JSON.stringify({
          message: message || `upload: ${filename}`,
          content: content,
        }),
      }
    );

    if (!githubRes.ok) {
      const errText = await githubRes.text();
      return res.status(502).json({ error: "Échec de l'upload GitHub", details: errText });
    }

    const publicUrl = `https://clcreation542-coder.github.io/Code-3D/${filename}`;
    return res.status(200).json({ success: true, url: publicUrl, path: filename });
  } catch (err) {
    return res.status(500).json({ error: "Erreur serveur", details: String(err) });
  }
}
