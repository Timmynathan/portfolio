export default function Footer() {
  return (
    <footer
      style={{
        padding: "1.5rem",
        textAlign: "center",
        borderTop: "1px solid #ccc",
      }}
    >
      <p>© {new Date().getFullYear()} Ilesanmi Oluwatimilehin Nathaniel. All rights reserved.</p>
    </footer>
  );
}