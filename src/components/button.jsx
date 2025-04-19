export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        backgroundColor: "#FF4404",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontSize: "1rem",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
