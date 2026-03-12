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
  // ตัวแปรที่ไว้ใช้ในการกดปุ่มโหลดใหม่
  const [refresh, setRefresh] = useState(false);
  // ตัวแปรไว้เก็บหน้าที่อยู่ ณ ปัจจุบัน
  const [currentPage, setCurrentPage] = useState(1); //เริ่มต้นที่หน้าแรก

  // ฟังก์ไว้เรียกใช้งาน fetch
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

  // ทำ 1 ครั้งตอนเริ่มต้น และทำทุกครั้งเมื่อ refrech มีการเปลี่ยนแปลง
  useEffect(() => {
    fetchPosts();
  }, [refresh]);

  //กรองโพสต์ตาม search
  const filtered = posts.filter(
    (post) => post.title.toLowerCase().includes(search.toLowerCase()),
    // กรองเอาแค่หัวข้อที่ตรงกับคำค้นหา
    // .includes ทำหน้าที่ในการตรวจสอบว่าค่าที่ใส่ไปนั้นอยู่ใน Array หรือ String หรือไม่
  );

  //แสดงเพียง 10 รายการต่อหน้า
  //โดยที่ตัดแบ่ง filtered
  const pagePosts = filtered.slice((currentPage - 1) * 10, currentPage * 10);
  //ต้องการ 10 รายการ/หน้า
  //เริ่มจาก:  ((เลขหน้า) - 1) * 10
  //สิ้นสุด: ((เลขหน้า) * 10)
  //หน้า 1 - เริ่มจาก: (1 - 1) * 10 = 0 (เริ่มจากรายการที่ 0)
  //หน้า 1 - สิ้นสุด: 1 * 10 (สิ้นสุดรายการที่ 10)
  //หน้า 2 - เริ่มจาก: (2 - 1) * 10 = 10 (เริ่มจากรายการที่ 10)
  //หน้า 2 - สิ้นสุด: 2 * 10 = 20 (สิ้นสุดรายการที่ 20)

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

      {/* ปุ่มสำหรับการดึงข้อมูลใหม่ */}
      {/* เมื่อกดปุ่ม สถานะ refresh ก็จะเปลี่ยนแปลง */}
      <div>
        <button
          onClick={() => setRefresh((prev) => !prev)}
          style={{ border: "1px solid #1e40af", background: "none" }}
        >
          🔄 โหลดใหม่
        </button>
      </div>

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
      {/* เปลี่ยนมาใช้ตัวแปรที่มีโพสต์ 10 รายการที่ตัดมาแทน */}
      {pagePosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}

      {/* แสดงหน้าที่อยู่และปุ่มเปลี่ยนหน้า */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem",
          marginTop: "2rem",
        }}
      >
        <button
          // เมื่อคลิก currentPage ลดไป 1
          onClick={() => setCurrentPage((prev) => prev - 1)}
          // จะไม่สามารถกดได้ถ้าอยู่หน้า 1
          disabled={currentPage === 1}
        >
          ← ก่อนหน้า
        </button>
        <p>หน้า {currentPage} / 2</p>
        <button
          // เมื่อคลิก currentPage เพิ่มไป 1
          onClick={() => setCurrentPage((prev) => prev + 1)}
          // จะไม่สามารถกดได้ถ้าอยู่หน้า 2
          disabled={currentPage === 2}
        >
          ถัดไป →
        </button>
      </div>
    </div>
  );
}
export default PostList;
