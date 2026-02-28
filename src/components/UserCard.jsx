function UserCard({ name, email }) {
  //ดึงตัวอักษรแรกมาทำ avatar
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  //แปลงตัวอักษรตัวเลขโดยการหารเอาเศษด้วย 3
  const charName = name.charCodeAt(0) % 3;
  //ค่าเริ่มต้นเป็นสีน้ำเงิน
  let bgColor = "#1e40af"; //สีค่าเริ่มต้น

  switch (charName) {
    case 0:
      bgColor = "#1e40af";
      break;
    case 1:
      bgColor = "#40af1e";
      break;
    case 2:
      bgColor = "#451eaf";
      break;
    default:
      bgColor = "#1e40af";
      break;
  }

  //

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "0.75rem 1rem",
        marginBottom: "0.75rem",
        background: "white",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          background: bgColor, //นำค่าสีที่ได้มาแทนที่สีตรงนี้
          color: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "0.9rem",
        }}
      >
        {initials}
      </div>
      <div>
        <div style={{ fontWeight: "bold", color: "#2d3748" }}>{name}</div>
        <div style={{ fontSize: "0.85rem", color: "#718096" }}>{email}</div>
      </div>
    </div>
  );
}

export default UserCard;
