const SHEET_NAME = "Responses";

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Name", "Mobile", "Address", "Amount", "Payment Status"]);
  }

  const data = JSON.parse(e.postData.contents || "{}");
  sheet.appendRow([
    new Date(),
    data.name || "",
    data.mobile || "",
    data.address || "",
    data.amount || "",
    data.payment_status || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({success:true}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput("Order backend is running.");
}