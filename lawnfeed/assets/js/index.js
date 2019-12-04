var btn = document.getElementById("btn-download");
var p = document.getElementById("release-name");

        window.addEventListener("load", function() {
          loadJSON("https://storage.codebucket.de/lawnchair/version.json",
            function(data) {
              var fileName = "Lawnfeed-" + data.app_version + ".apk";
              var fileUrl = "https://storage.codebucket.de/lawnchair/" + data.app_version + "/" + fileName;
              btn.setAttribute("href", fileUrl);
              btn.setAttribute("download", fileName);
              p.innerHTML = "Version <i>" + data.app_version + "</i>";
            },
            
            function(error) {
              btn.setAttribute("href", "https://status.razex.de");
              p.innerHTML = "No Connection";
            }
          );
        });
    
        function loadJSON(path, success, error) {
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              if (success)
                success(JSON.parse(xhr.responseText));
              } else {
              if (error)
                error(xhr);
              }
            }
          };
    
          xhr.open("GET", path, true);
          xhr.send();
        }