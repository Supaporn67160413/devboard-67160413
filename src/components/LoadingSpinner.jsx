// หน้ากำลังโหลดระหว่างที่ดึงข้อมูล
function LoadingSpinner() {
  return (
    <div style={{ textAlign: "center", padding: "3rem", color: "#718096" }}>
      {/* display: "inline-block" คือการจัดเรียงต่อกันในบรรทัดเดียวกัน สามารถกำหนดความกว้างความสูงได้ */}
      <div
        style={{
          display: "inline-block",
          width: "40px",
          height: "40px",
          border: "4px solid #e2e8f0",
          borderTopColor: "#1e40af", //มี border สีน้ำเงินแค่ข้างบน
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite", //อนิเมชั่นเป็นแบบ spin ระยะเวลา 0.8 วินาที/รอบ ด้วยความเร็วคงที่ ไม่มีวันหยุด
        }}
      />
      <p style={{ marginTop: "1rem" }}>กำลังโหลด...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg);}}`}</style>{" "}
      {/* เป็นการกำหนดว่าให้หมุน 360 องศา */}
    </div>
  );
}

export default LoadingSpinner;
