import { useState } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";

function PostList({ posts, favorites, onToggleFavorite }) {
  const [search, setSearch] = useState("");

  //กรองโพสต์ตาม search
  const filtered = posts.filter(
    (post) => post.title.toLowerCase().includes(search.toLowerCase()),
    // กรองเอาแค่หัวข้อที่ตรงกับคำค้นหา
    // .includes ทำหน้าที่ในการตรวจสอบว่าค่าที่ใส่ไปนั้นอยู่ใน Array หรือ String หรือไม่
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
          title={post.title}
          body={post.body}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}
export default PostList;
