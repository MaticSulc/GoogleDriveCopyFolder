function start() {
  var source = DriveApp.getFolderById('');
  var target = DriveApp.getFolderById('');
  copyFolder(source, target);
}

function copyFolder(source, target) {
  var files = source.getFiles();

  while (files.hasNext()) {
    var file = files.next();
    var fileName = file.getName();
    if (!target.getFilesByName(fileName).hasNext()) {
      // Only copy if not exists
      try {
        file.makeCopy(fileName, target);
      } catch(e) {
        Logger.log('Error ' + e + ' for file: ' + fileName);
      }
    }
  }

  var folders = source.getFolders();
  while (folders.hasNext()) {
    var subFolder = folders.next();
    var folderName = subFolder.getName();
    var existentFolder = target.getFoldersByName(folderName);

    var targetFolder = existentFolder.hasNext() ?
        existentFolder.next() : target.createFolder(folderName);
    
    copyFolder(subFolder, targetFolder);
  }
}
