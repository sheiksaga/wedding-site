/*
  WEDDING SITE - CORRECTED BACKEND
  Ref: Google Apps Script
*/

const DRIVE_FOLDER_ID = '1Miek4zsofK9Z5GvlrgJkr9yeIF8_llCG';

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  // Lock to prevent concurrent edit issues
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    // 1. Handle GET (Gallery Fetch)
    if (e.parameter.action === 'getFiles') {
      return getFileList();
    }

    // 2. Handle POST (File Upload)
    // We expect a JSON payload containing the Base64 string
    const data = JSON.parse(e.postData.contents);
    
    const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    const contentType = data.mimeType || 'application/octet-stream';
    const name = data.filename || 'upload-' + Date.now();
    
    // Convert Base64 back to binary
    const decoded = Utilities.base64Decode(data.file);
    const blob = Utilities.newBlob(decoded, contentType, name);
    
    const file = folder.createFile(blob);
    file.setDescription('Uploaded via Wedding Site');
    
    return createResponse({ 
      success: true, 
      file: { url: file.getUrl(), name: file.getName() } 
    });

  } catch (error) {
    return createResponse({ error: error.toString() });
  } finally {
    lock.releaseLock();
  }
}

function getFileList() {
  try {
    const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    const files = folder.getFiles();
    const fileList = [];
    
    while (files.hasNext()) {
      const file = files.next();
      const mime = file.getMimeType();
      
      if (mime.includes('image') || mime.includes('video')) {
        fileList.push({
          id: file.getId(),
          name: file.getName(),
          type: mime.includes('video') ? 'video' : 'image',
          // 1. MAIN URL: Use 'export=view' which forces the image/video to display in browser
          url: 'https://drive.google.com/uc?export=view&id=' + file.getId(),
          // 2. THUMBNAIL: Use the dedicated thumbnail endpoint (faster for grid)
          // 'sz=w600' requests a thumbnail 600px wide
          thumbnailUrl: 'https://drive.google.com/thumbnail?id=' + file.getId() + '&sz=w600'
        });
      }
    }
    
    // Sort newest first
    fileList.sort((a, b) => b.name.localeCompare(a.name)); 
    
    return createResponse({ files: fileList });
  } catch (e) {
    return createResponse({ error: e.toString() });
  }
}

// Helper to return JSON safely
function createResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}