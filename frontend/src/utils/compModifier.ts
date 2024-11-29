export function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar?.classList.contains("hidden")) {
    sidebar?.classList.remove("hidden");
    sidebar?.classList.add("w-64");
  } else {
    sidebar?.classList.add("hidden");
  }
}
