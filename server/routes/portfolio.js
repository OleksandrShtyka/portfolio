// filepath: server/routes/portfolio.js
import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { portfolioData } from "../data/portfolioStore.js";

const router = express.Router();

// GET /api/portfolio — public, returns all data
router.get("/", (req, res) => {
  res.json(portfolioData);
});

// PUT /api/portfolio/hero — admin only
router.put("/hero", verifyToken, (req, res) => {
  portfolioData.hero = { ...portfolioData.hero, ...req.body };
  res.json({ success: true, data: portfolioData.hero });
});

// PUT /api/portfolio/about — admin only
router.put("/about", verifyToken, (req, res) => {
  portfolioData.about = { ...portfolioData.about, ...req.body };
  res.json({ success: true, data: portfolioData.about });
});

// --- SKILLS ---
router.post("/skills", verifyToken, (req, res) => {
  const skill = { ...req.body, id: Date.now() };
  portfolioData.skills.push(skill);
  res.json({ success: true, data: skill });
});

router.put("/skills/:id", verifyToken, (req, res) => {
  const id = Number(req.params.id);
  const idx = portfolioData.skills.findIndex((s) => s.id === id);
  if (idx === -1) return res.status(404).json({ error: "Skill not found" });
  portfolioData.skills[idx] = { ...portfolioData.skills[idx], ...req.body };
  res.json({ success: true, data: portfolioData.skills[idx] });
});

router.delete("/skills/:id", verifyToken, (req, res) => {
  const id = Number(req.params.id);
  portfolioData.skills = portfolioData.skills.filter((s) => s.id !== id);
  res.json({ success: true });
});

// --- PROJECTS ---
router.post("/projects", verifyToken, (req, res) => {
  const project = { ...req.body, id: Date.now() };
  portfolioData.projects.push(project);
  res.json({ success: true, data: project });
});

router.put("/projects/:id", verifyToken, (req, res) => {
  const id = Number(req.params.id);
  const idx = portfolioData.projects.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ error: "Project not found" });
  portfolioData.projects[idx] = { ...portfolioData.projects[idx], ...req.body };
  res.json({ success: true, data: portfolioData.projects[idx] });
});

router.delete("/projects/:id", verifyToken, (req, res) => {
  const id = Number(req.params.id);
  portfolioData.projects = portfolioData.projects.filter((p) => p.id !== id);
  res.json({ success: true });
});

// --- EXPERIENCE ---
router.post("/experience", verifyToken, (req, res) => {
  const exp = { ...req.body, id: Date.now() };
  portfolioData.experience.push(exp);
  res.json({ success: true, data: exp });
});

router.put("/experience/:id", verifyToken, (req, res) => {
  const id = Number(req.params.id);
  const idx = portfolioData.experience.findIndex((e) => e.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  portfolioData.experience[idx] = { ...portfolioData.experience[idx], ...req.body };
  res.json({ success: true, data: portfolioData.experience[idx] });
});

router.delete("/experience/:id", verifyToken, (req, res) => {
  const id = Number(req.params.id);
  portfolioData.experience = portfolioData.experience.filter((e) => e.id !== id);
  res.json({ success: true });
});

export default router;
