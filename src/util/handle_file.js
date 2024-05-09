export default class HandleFile {
    createAndDownloadFile() {
        const data = 'This is the content of the file.';
        const blob = new Blob([data], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
      
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'example.txt';
        document.body.appendChild(a);
      
        a.click();
      
        window.URL.revokeObjectURL(url);
      }
    handleFileInputChange(event) {
      const file = event.target.files[0];
    
      if (file) {
        const reader = new FileReader();
    
        reader.onload = function (e) {
          const fileContent = e.target.result;
          // console.log('File content:', fileContent);
        };
    
        reader.readAsText(file);
      }
    }  
}