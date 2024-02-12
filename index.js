const repoPath = "Muhammad-Ashraf9/PD";
const branch = "main";

const apiUrl = `https://api.github.com/repos/${repoPath}/contents/?ref=${branch}`;
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const dropdownContent = document.getElementById('mySidebar');

        const folders = data.filter(item => item.type === 'dir');


        folders.forEach(folder => {
            const folderApiUrl = folder.url;
            fetch(folderApiUrl)
                .then(response => response.json())
                .then(folderData => {
                    const folderMdFiles = folderData.filter(item => item.name.endsWith('.md'));
                    const folderHtml = `<div class="w3-dropdown-click">
                    <button class="w3-button w3-teal toggleDropdownBtn">${folder.name}  <i class="fa fa-caret-down"></i> </button>
                   
                   
                    <div class="w3-dropdown-content w3-bar-block w3-border Demo">
                        ${folderMdFiles.map(file => `<a href="#" class="w3-bar-item w3-button">${file.name}</a>`).join('')}
                    </div>
                </div>`;
                    dropdownContent.innerHTML += folderHtml;
                });

        });

    })
    .catch(error => console.error('Error fetching repository contents:', error));
//
document.addEventListener('DOMContentLoaded', function () {
    var main = document.getElementById("main");
    var openNavBtn = document.getElementById("openNav");
    var closeSidebarBtn = document.getElementById("closeSidebarBtn");
    var sidebar = document.getElementById("mySidebar");

    // Add click event listener to the document for delegation
    document.addEventListener('click', function (event) {
        var target = event.target;

        if (target === openNavBtn || target === closeSidebarBtn || target.parentNode === sidebar) {
            toggleSidebar();
        } else if (target.classList.contains('toggleDropdownBtn')) {
            var dropdownContent = target.nextElementSibling;
            toggleDropdown(dropdownContent);
        }
    });

    function toggleSidebar() {
        main.style.marginLeft = (main.style.marginLeft === "25%") ? "0%" : "25%";
        sidebar.style.width = (main.style.marginLeft === "25%") ? "25%" : "0%";
        sidebar.style.display = (main.style.marginLeft === "25%") ? "block" : "none";
        openNavBtn.style.display = (main.style.marginLeft === "25%") ? 'none' : 'inline-block';
    }

    function toggleDropdown(dropdownContent) {
        dropdownContent.classList.toggle("w3-show");
    }
    // remove class w3-show when clicking other elements and if other dropdown is toogling
    document.addEventListener('click', function (event) {
        const target = event.target;
        var dropdowns = document.getElementsByClassName("w3-dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            if (dropdowns[i].classList.contains('w3-show') && target !== dropdowns[i].previousElementSibling) {
                dropdowns[i].classList.remove('w3-show');
            }
        }
    });

});
//render content by clicking on the link
document.addEventListener('click', function (event) {
    var target = event.target;
    if (target.tagName === 'A') {
        var mdContainer = document.getElementById("mdcontainer");
        var folder = target.closest('.w3-dropdown-click').querySelector('.toggleDropdownBtn').textContent.trim();
        console.log(folder)
        let url = `https://raw.githubusercontent.com/${repoPath}/${branch}/${folder}/${target.textContent}`;
        // replace all #
        url = url.replace(/#/g, '%23');
  
        // replace all 
        url = url.replace(/ /g, '%20');
        console.log(url);
        mdContainer.innerHTML = '';
        var mdElement = document.createElement("zero-md");
        mdElement.src = url;
        mdElement.noShadow = "";
        mdContainer.appendChild(mdElement);
    }
});
