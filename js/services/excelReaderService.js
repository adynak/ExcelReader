excelReader.service("excelReaderService", 
    function() {


		function randomInterval(min,max)
		{
		    return Math.floor(Math.random()*(max-min+1)+min);
		}

        var copyToClipboard = function(text) {
        	if (text == 'check_'){
        		text = text + randomInterval(1000,9999);
        	}

			if (window.clipboardData && window.clipboardData.setData) {
			  // IE specific code path to prevent textarea being shown while dialog is visible.
			  return clipboardData.setData("Text", text);
			} else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
			  var textarea = document.createElement("textarea");
			  textarea.textContent = text;
			  textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
		  	  document.body.appendChild(textarea);
			  textarea.select();
			  try {
			      return document.execCommand("copy"); // Security exception may be thrown by some browsers.
			  } catch (ex) {
			      console.warn("Copy to clipboard failed.", ex);
			      return false;
			  } finally {
			      document.body.removeChild(textarea);
			  }
			}
		}

        return {
            copyToClipboard:copyToClipboard
        };
    }
);