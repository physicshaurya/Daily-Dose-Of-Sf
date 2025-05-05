// Generic Google Sheet Data Fetch Function
async function fetchCSVData(sheetId, sheetName) {
  const sheetNameEncoded = encodeURIComponent(sheetName);
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetNameEncoded}`;

  try {
    const response = await $.ajax({
      type: "GET",
      url: sheetUrl,
      dataType: "text",
    });

    // Ensure the CSV library is loaded
    if (!$.csv) {
      throw new Error("jQuery CSV plugin not loaded");
    }

    const data = $.csv.toObjects(response);

    return data;
  } catch (error) {
    console.error("Error fetching CSV data:", error);
    return [];
  }
}

// Adapter function to process the data and transform it to the form suitable to process
function processCSVResponse(data) {
  const processedData = [];
  let rowIndex = 1;
  const baseDate = new Date("2025-02-05"); // Corrected base date format

  data.forEach((row) => {
    const transformedRow = {
      id: rowIndex,
      title: row.Topic.trim(),
      content: row.Content.trim(),
      likes: row.LikeCount ? row.LikeCount : Math.ceil(Math.random() * 25),
      comments: row.CommentCount
        ? row.CommentCount
        : Math.ceil(Math.random() * 15),
      date: new Date(baseDate.getTime() + rowIndex * 24 * 60 * 60 * 1000) // Adds rowIndex days
        .toISOString()
        .split("T")[0], // Format as YYYY-MM-DD
    };
    console.log(row);
    console.log(row.Resource);

    if (transformedRow.content.length > 0 && transformedRow.title.length > 0) {
      processedData.push(transformedRow);
      rowIndex++;
    }
  });

  return processedData;
}
