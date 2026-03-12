import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import LoadingSpinner from "./LoadingSpinner";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users"); //ไปดึงข้อมูลมาเก็บไว้ในตัวแปรที่ชื่อ res
        if (!res.ok) throw new Error("ดึงข้อมูลผู้ใช้ไม่สำเร็จ"); //ถ้าข้อมูลที่ส่งมาไม่เป็นสถานะ ok ก็จะบังคับให้ Error และส่งข้อความว่าดึงข้อมูลผู้ใช้ไม่สำเร็จ
        const data = await res.json(); //แปลงเป็น JavaScript Object
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []); //ทำเพียครั้งเดียว

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div
        style={{
          padding: "1.5rem",
          background: "#fff5f5",
          border: "1px solid #fc8181",
          borderRadius: "8px",
          color: "#c53030",
        }}
      >
        เกิดข้อผิดพลาด: {error}
      </div>
    );

  return (
    <div>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        สมาชิก
      </h2>
      {users.map((user) => (
        <UserCard key={user.id} name={user.name} email={user.email} />
      ))}
    </div>
  );
}

export default UserList;
