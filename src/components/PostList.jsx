import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";
import LoadingSpinner from "./LoadingSpinner";

// Project Task 3: เปลี่ยนจากการรับ posts มา fetch เอง
function PostList({ favorites, onToggleFavorite }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true); //ระหว่างที่โหลดข้อมูลทำการขึ้นว่ากำลังโหลด
        setError(null);

        const res = await fetch("https://jsonplaceholder.typicode.com/posts"); //ไปดึงข้อมูลมาเก็บไว้ในตัวแปรที่ชื่อ res
        if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ"); //ถ้าข้อมูลที่ส่งมาไม่เป็นสถานะ ok ก็จะบังคับให้ Error และส่งข้อความว่าดึงข้อมูลไม่สำเร็จ
        const data = await res.json(); //แปลงจากข้อมูลเยอะแยะมากมาย มาเป็นข้อมูลที่มีแต่เนื้อหาที่อยู่ในรูปแบบของ JavaScript Object
        setPosts(data.slice(0, 20)); //เอาแค่ 20 รายการแรก
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); //เมื่อดึงข้อมูลเสร็จก็จะหยุดโหลดและแสดงข้อมูลลต่อไป
      }
    }

    fetchPosts();
  }, []); //ทำครั้งเดียวตอน component mount

  //กรองโพสต์ตาม search
  const filtered = posts.filter(
    (post) => post.title.toLowerCase().includes(search.toLowerCase()),
    // กรองเอาแค่หัวข้อที่ตรงกับคำค้นหา
    // .includes ทำหน้าที่ในการตรวจสอบว่าค่าที่ใส่ไปนั้นอยู่ใน Array หรือ String หรือไม่
  );

  //ถ้า lading เป็น true จะเรียกใช้ component ที่ชื่อ LoadingSpinner
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
        โพสต์ล่าสุด
      </h2>

      {/* นับจำนวนโพสต์ */}
      <PostCount count={posts.length} />

      {/* กล่องค้นหา */}
      <input
        type="text"
        // หากไม่ได้พิมพ์อะไรจะขึ้นข้อความว่า "ค้นหาโพสต์..."
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      {/* ถ้าไม่พบโพสต์ */}
      {filtered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {/* แสดงรายการโพสต์ */}
      {filtered.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}
export default PostList;
