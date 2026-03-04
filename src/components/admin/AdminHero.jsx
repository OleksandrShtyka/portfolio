// filepath: src/components/admin/AdminHero.jsx
import { useState } from "react";
import { api } from "../../services/api";

export default function AdminHero({ data, onSave }) {
  const [form, setForm] = useState({
    name: data.name,
    title: data.title,
    subtitle: data.subtitle,
    contacts: { ...data.contacts },
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("contacts.")) {
      const key = name.split(".")[1];
      setForm((p) => ({ ...p, contacts: { ...p.contacts, [key]: value } }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.updateHero(form);
      await onSave();
      setMsg("✅ Saved!");
    } catch {
      setMsg("❌ Error saving");
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(""), 2000);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Name</label>
        <input name="name" className="form-input" value={form.name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label className="form-label">Title</label>
        <input name="title" className="form-input" value={form.title} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label className="form-label">Subtitle</label>
        <textarea name="subtitle" className="form-input form-textarea" value={form.subtitle} onChange={handleChange} rows={3} />
      </div>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input name="contacts.email" className="form-input" value={form.contacts.email} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label className="form-label">GitHub URL</label>
        <input name="contacts.github" className="form-input" value={form.contacts.github} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label className="form-label">LinkedIn URL</label>
        <input name="contacts.linkedin" className="form-input" value={form.contacts.linkedin} onChange={handleChange} />
      </div>
      <div className="admin-form__footer">
        <button type="submit" className="btn btn--primary" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {msg && <span className="admin-form__msg">{msg}</span>}
      </div>
    </form>
  );
}
