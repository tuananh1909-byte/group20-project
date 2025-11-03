// src/components/UserList.jsx
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export default function UserList({ refreshKey }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setErr("");

    axiosClient
      .get("/users") // GET http://localhost:3000/users
      .then((res) => {
        if (!isMounted) return;
        // Hỗ trợ cả hai dạng dữ liệu: res.data là mảng hoặc {data: mảng}
        const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setUsers(data);
      })
      .catch((e) => setErr(e.message))
      .finally(() => isMounted && setLoading(false));

    return () => (isMounted = false);
  }, [refreshKey]);

  if (loading) return <div className="card">Đang tải danh sách user...</div>;
  if (err) return <div className="card error">Lỗi: {err}</div>;

  return (
    <div className="card">
      <h2 className="card-title">Danh sách User</h2>
      {users.length === 0 ? (
        <p>Chưa có user nào.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: 80 }}>ID</th>
              <th>Tên</th>
              <th>Email</th>
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
      )}
    </div>
  );
}
