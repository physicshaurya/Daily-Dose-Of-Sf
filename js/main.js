import { createPostCard } from "./postCard.js";

async function init() {
  const SHEET_ID = "1Wmvk_HC1tZFywsMtJaEc-1WSNcIcIfLS4yrnZscXYFM";
  // const SHEET_NAME = "Main_Test";
  const SHEET_NAME = "Main";
  try {
    const data = await fetchCSVData(SHEET_ID, SHEET_NAME);

    const processedData = processCSVResponse(data);
    displayPosts(processedData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayPosts(posts) {
  const container = document.getElementById("posts-container");
  container.innerHTML = "";

  posts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach((post) => container.appendChild(createPostCard(post)));
}

document.addEventListener("DOMContentLoaded", init);
