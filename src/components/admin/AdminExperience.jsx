// filepath: src/components/admin/AdminExperience.jsx
import { useState } from "react";
import { api } from "../../services/api";

const EMPTY = { role: "", company: "", period: "", description: "" };

export default function AdminExperience({ data, onSave }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [msg, setMsg] = useState("");

  const startEdit = (e) => { setEditing(e.id); setForm({ ...e }); };
  const startAdd = () => { setEditing("new"); setForm(EMPTY); };
  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    try {
      if (editing === "new") {
        await api.addExperience(form);
      } else {
        await api.updateExperience(editing, form);
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
    if (!confirm("Delete?")) return;
    await api.deleteExperience(id);
    await onSave();
  };

  return (
    <div className="admin-list">
      <div className="admin-list__header">
        <h3>Experience ({data.length})</h3>
        <button className="btn btn--sm btn--primary" onClick={startAdd}>+ Add</button>
      </div>

      {editing && (
        <div className="admin-list__edit-panel">
          <h4>{editing === "new" ? "New Entry" : "Edit Entry"}</h4>
          {["role", "company", "period", "description"].map((field) => (
            <div key={field} className="form-group">
              <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
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
        {data.map((exp) => (
          <div key={exp.id} className="admin-list__item">
            <div className="admin-list__item-info">
              <span className="admin-list__item-name">{exp.role}</span>
              <span className="admin-list__item-sub">{exp.company} · {exp.period}</span>
            </div>
            <div className="admin-list__item-actions">
              <button className="btn btn--sm btn--outline" onClick={() => startEdit(exp)}>Edit</button>
              <button className="btn btn--sm btn--danger" onClick={() => handleDelete(exp.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
