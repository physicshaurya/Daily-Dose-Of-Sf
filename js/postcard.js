import { openModal } from "./modal.js";

export function createPostCard(post) {
  const postDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const card = document.createElement("article");
  card.classList.add("post-card");

  card.innerHTML = `
    <div class="p-6">
        <div class="flex justify-between items-start mb-4">
            <span class="post-date text-sm font-medium">${postDate}</span>
            <div class="flex items-center space-x-4">
                <span class="text-gray-600 text-sm">❤️ ${post.likes}</span>
                <span class="text-gray-600 text-sm">💬 ${post.comments}</span>
            </div>
        </div>
        <p class="post-content">${post.content.replace(/\n/g, "<br>")}</p>
        <span class="post-hashtag inline-block px-3 py-1 rounded-full text-white text-sm font-medium cursor-pointer">#${post.title.replace(
          / /g,
          "_"
        )}</span>
    </div>
  `;

  // Click event to open modal with full post content
  card.addEventListener("click", () => openModal(post.title, post.content));

  return card;
}
