import { useState } from "react";

function AddPostForm({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function handleSubmit(e) {
    // ป้องกันการรีเฟรชหน้า เพื่อไม่ให้ข้อมูลหาย
    e.preventDefault();
    if (!title.trim() || !body.trim()) return; // ป้องกันไม่ให้ส่งค่าว่าง

    onAddPost({ title, body });
    setTitle(""); // เคลียร์ฟอร์มเมื่อกดส่งแล้ว
    setBody("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1.5rem",
        background: "#f7fafc",
      }}
    >
      <h3 style={{ margin: "0 0 0.75rem", color: "#2d3748" }}>
        เพิ่มโพสต์ใหม่
      </h3>

      {/* หัวข้อ */}
      <div>
        <input
          type="text"
          placeholder="หัวข้อโพสต์"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "0.5rem",
            border: "1px solid #cbd5e0",
            borderRadius: "4px",
            fontSize: "1rem",
            boxSizing: "border-box",
          }}
        />
        {/* นับจำนวนข้อความที่พิมพ์เข้าไป */}
        <p
          style={{
            fontSize: "12px",
            marginTop: "1px",
            marginBottom: "5px",
            textAlign: "right",
            marginRight: "5px",
            color: title.length > 90 ? "#bb0000" : "#000000",
          }}
        >
          {title.length} / 100
        </p>
      </div>

      {/* เนื้อหา */}
      <textarea
        placeholder="เนื้อหาโพสต์"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "4px",
          fontSize: "1rem",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />

      {/* ปุ่มโพสต์ */}
      <button
        type="submit"
        style={{
          background: "#1e40af",
          color: "white",
          border: "none",
          padding: "0.5rem 1.5rem",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        โพสต์
      </button>
    </form>
  );
}
export default AddPostForm;
