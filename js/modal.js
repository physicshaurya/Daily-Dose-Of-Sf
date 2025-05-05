export function openModal(title, content) {
    const modal = document.getElementById("post-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalContent = document.getElementById("modal-content");
  
    modalTitle.textContent = title;
  
    // Detect if content contains code snippets
    if (content.includes("```")) {
      modalContent.innerHTML = formatCodeContent(content).replace(/\n/g, "<br>");
    } else {
      modalContent.innerHTML = content.replace(/\n/g, "<br>"); // Format new lines for normal text
    }
  
    modal.classList.add("show"); // Show modal correctly
  }
  
  // Function to properly format code blocks
  function formatCodeContent(content) {
    return content
      .replace(/```(.*?)\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre><code class="language-${lang}">${escapeHtml(code)}</code></pre>`;
      });
  }
  
  // Escape HTML characters to prevent issues inside <code>
  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  
  // Close modal when clicking outside or pressing the close button
  document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("post-modal");
    const closeBtn = modal.querySelector(".close-btn");
  
    closeBtn.addEventListener("click", () => modal.classList.remove("show"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("show"); // Close when clicking outside content
    });
  });
  