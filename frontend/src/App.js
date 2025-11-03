import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Không lấy được danh sách user");
    }
  };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/users", form);
      alert("Thêm user thành công!");
      setForm({ name: "", email: "" });
      getUsers(); // tải lại danh sách
    } catch (err) {
      console.error(err);
      alert("Không thêm được user");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Danh sách User</h2>

      <table border="1" cellPadding="10" style={{ width: "400px" }}>
        <thead>
          <tr>
            <th>ID</th><th>Tên</th><th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id || u._id}>
              <td>{u.id || u._id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <h2>Thêm User</h2>
      <form onSubmit={addUser}>
        <input
          placeholder="Tên"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <br /><br />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <br /><br />
        <button type="submit">Thêm user</button>
      </form>
    </div>
  );
}

export default App;
