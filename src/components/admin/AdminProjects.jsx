// filepath: src/components/admin/AdminProjects.jsx
import { useState } from "react";
import { api } from "../../services/api";

const EMPTY = { title: "", description: "", tech: "", github: "", demo: "" };

export default function AdminProjects({ data, onSave }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [msg, setMsg] = useState("");

  const startEdit = (p) => {
    setEditing(p.id);
    setForm({ ...p, tech: p.tech.join(", ") });
  };

  const startAdd = () => {
    setEditing("new");
    setForm(EMPTY);
  };

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    const payload = { ...form, tech: form.tech.split(",").map((t) => t.trim()).filter(Boolean) };
    try {
      if (editing === "new") {
        await api.addProject(payload);
      } else {
        await api.updateProject(editing, payload);
      }
      await onSave();
      setEditing(null);
      setMsg("✅ Saved!");
    } catch {
      setMsg("❌ Error");
    }
    setTimeout(() => setMsg(""), 2000);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    await api.deleteProject(id);
    await onSave();
  };

  return (
    <div className="admin-list">
      <div className="admin-list__header">
        <h3>Projects ({data.length})</h3>
        <button className="btn btn--sm btn--primary" onClick={startAdd}>+ Add Project</button>
      </div>

      {editing && (
        <div className="admin-list__edit-panel">
          <h4>{editing === "new" ? "New Project" : "Edit Project"}</h4>
          {["title", "description", "tech", "github", "demo"].map((field) => (
            <div key={field} className="form-group">
              <label className="form-label">{field === "tech" ? "Tech (comma separated)" : field.charAt(0).toUpperCase() + field.slice(1)}</label>
              {field === "description" ? (
                <textarea name={field} className="form-input form-textarea" value={form[field]} onChange={handleChange} rows={3} />
              ) : (
                <input name={field} className="form-input" value={form[field]} onChange={handleChange} />
              )}
            </div>
          ))}
          <div className="admin-form__footer">
            <button className="btn btn--primary" onClick={handleSave}>Save</button>
            <button className="btn btn--ghost" onClick={() => setEditing(null)}>Cancel</button>
            {msg && <span className="admin-form__msg">{msg}</span>}
          </div>
        </div>
      )}

      <div className="admin-list__items">
        {data.map((project) => (
          <div key={project.id} className="admin-list__item">
            <div className="admin-list__item-info">
              <span className="admin-list__item-name">{project.title}</span>
              <span className="admin-list__item-sub">{project.tech.join(", ")}</span>
            </div>
            <div className="admin-list__item-actions">
              <button className="btn btn--sm btn--outline" onClick={() => startEdit(project)}>Edit</button>
              <button className="btn btn--sm btn--danger" onClick={() => handleDelete(project.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
