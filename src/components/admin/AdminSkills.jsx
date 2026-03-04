// filepath: src/components/admin/AdminSkills.jsx
import { useState } from "react";
import { api } from "../../services/api";

const EMPTY = { name: "", level: 80, category: "Frontend" };

export default function AdminSkills({ data, onSave }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [msg, setMsg] = useState("");

  const startEdit = (skill) => {
    setEditing(skill.id);
    setForm({ name: skill.name, level: skill.level, category: skill.category });
  };

  const startAdd = () => {
    setEditing("new");
    setForm(EMPTY);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: name === "level" ? Number(value) : value }));
  };

  const handleSave = async () => {
    try {
      if (editing === "new") {
        await api.addSkill(form);
      } else {
        await api.updateSkill(editing, form);
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
    if (!confirm("Delete this skill?")) return;
    await api.deleteSkill(id);
    await onSave();
  };

  return (
    <div className="admin-list">
      <div className="admin-list__header">
        <h3>Skills ({data.length})</h3>
        <button className="btn btn--sm btn--primary" onClick={startAdd}>
          + Add Skill
        </button>
      </div>

      {editing && (
        <div className="admin-list__edit-panel">
          <h4>{editing === "new" ? "New Skill" : "Edit Skill"}</h4>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input name="name" className="form-input" value={form.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select name="category" className="form-input" value={form.category} onChange={handleChange}>
                <option>Frontend</option>
                <option>Backend</option>
                <option>Tools</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Level: {form.level}%</label>
              <input name="level" type="range" min="0" max="100" className="form-range" value={form.level} onChange={handleChange} />
            </div>
          </div>
          <div className="admin-form__footer">
            <button className="btn btn--primary" onClick={handleSave}>Save</button>
            <button className="btn btn--ghost" onClick={() => setEditing(null)}>Cancel</button>
            {msg && <span className="admin-form__msg">{msg}</span>}
          </div>
        </div>
      )}

      <div className="admin-list__items">
        {data.map((skill) => (
          <div key={skill.id} className="admin-list__item">
            <div className="admin-list__item-info">
              <span className="admin-list__item-name">{skill.name}</span>
              <span className="admin-list__item-sub">{skill.category} · {skill.level}%</span>
            </div>
            <div className="admin-list__item-actions">
              <button className="btn btn--sm btn--outline" onClick={() => startEdit(skill)}>Edit</button>
              <button className="btn btn--sm btn--danger" onClick={() => handleDelete(skill.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
