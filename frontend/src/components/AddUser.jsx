// src/components/AddUser.jsx
import { useState } from "react";
import axiosClient from "../api/axiosClient";

export default function AddUser({ onAdded }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setOk("");

    if (!form.name.trim() || !form.email.trim()) {
      setErr("Vui lòng nhập đầy đủ Tên và Email.");
      return;
    }

    try {
      setSubmitting(true);
      await axiosClient.post("/users", {
        name: form.name.trim(),
        email: form.email.trim(),
      }); // POST http://localhost:3000/users

      setOk("Thêm user thành công!");
      setForm({ name: "", email: "" });
      onAdded?.(); // báo cho App để reload list
    } catch (e) {
      setErr(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Thêm User</h2>
      <form onSubmit={submit} className="form">
        <div className="form-row">
          <label>Tên</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="VD: Nguyễn Văn A"
          />
        </div>
        <div className="form-row">
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="vd@domain.com"
            type="email"
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? "Đang lưu..." : "Thêm user"}
        </button>
      </form>

      {err && <div className="note error">{err}</div>}
      {ok && <div className="note success">{ok}</div>}
    </div>
  );
}
