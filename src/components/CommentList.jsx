// ใช้สำหรับการดึงความคิดเห็น
import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchcomment() {
      try {
        // ขึ้นว่ากำลังโหลด ขณะที่กำลังไปดึงข้อมูลมาจาก API
        setLoading(true);
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`, //ดึงข้อมูลComment Postที่ต้องการมาไว้ในตัวแปร res
        );
        if (!res.ok) throw new Error("ดึงความคิดเห็นไม่สำเร็จ"); //ถ้าข้อมูลที่ส่งมาไม่เป็นสถานะ ok ก็จะบังคับให้ Error และส่งข้อความว่าดึงความคิดเห็นไม่สำเร็จ
        const data = await res.json(); //แปลงเป็น JavaScript Object
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); //เมื่อดึงความคิดเห็นเสร็จแล้ว หยุดแสดงกำลังโหลด แล้วขึ้นข้อมูลความคิดเห็นแต่ละอันแทน
      }
    }

    fetchcomment(); //อย่าลืมที่จะเรียกใช้ไม่อย่างงั้นจะดึงข้อมูลไม่ได้
  }, [postId]); //จะ Fetch ทุกครั้งที่ postId มีการเปลี่ยนแปลง

  if (loading)
    return <p style={{ color: "#718096" }}>กำลังโหลดความคิดเห็น...</p>;
  if (error) return <p style={{ color: "#c53030" }}>{error}</p>;

  return (
    <div style={{ marginTop: "0.75rem" }}>
      <strong style={{ color: "#4a5568" }}>
        ความคิดเห็น ({comments.length})
      </strong>

      {/* วนลูป Comment ออกมาทีละอัน โดยแต่ละอันจะแสดงผลตามรูปแบบที่กำหนด */}
      {comments.map((comment) => (
        <div
          key={comment.id}
          style={{
            background: "#f7fafc",
            borderRadius: "6px",
            padding: "0.5rem 0.75rem",
            marginTop: "0.5rem",
            fontSize: "0.85rem",
          }}
        >
          <div style={{ fontWeight: "bold", color: "#2d3748" }}>
            {comment.name}
          </div>
          <div style={{ color: "#718096" }}>{comment.body}</div>
        </div>
      ))}
    </div>
  );
}
export default CommentList;
