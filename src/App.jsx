import { useState } from "react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import UserList from "./components/UserList";
import AddPostForm from "./components/AddPostForm";
import "./App.css";

function App() {
  // const [posts, setPosts] = useState(POSTS);
  const [favorites, setFavorites] = useState([]); //เก็บ ID ที่ถูกใจ

  // Toggle ถูกใจ/ยกเลิก
  function handleToggleFavorite(postId) {
    setFavorites(
      (prev) =>
        prev.includes(postId) //ตรวจสอบว่ามีไอดีอยู่ใน Array กดถูกใจหรือไม่
          ? prev.filter((id) => id !== postId) //หากมีจะลบออก
          : [...prev, postId], //หากไม่มีจะเพิ่มเข้าไปใน Array
    );
  }

  return (
    <div>
      <Navbar favoriteCount={favorites.length} />
      <div
        style={{
          maxWidth: "900px",
          margin: "2rem auto",
          padding: "0 1rem",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
        }}
      >
        {/* คอลัมน์ซ้าย: โพสต์ */}
        <div>
          <AddPostForm onAddPost={() => {}} /> {/* จะเชื่อมใน wk14 */}
          <PostList
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
        {/* คอลัมน์ขวา: สมาชิก */}
        <div>
          <UserList />
        </div>
      </div>
    </div>
  );
}
export default App;
