document.addEventListener("DOMContentLoaded", function () {

  addTab('.tab-link', '.tab-content');
  addTab('.tab-link-logs', '.tab-content-logs');
  addTab('.tab-link-nav', '.tab-content-nav');
  addCollapsible("collapsible",)
  xmlParser();
});

function xmlParser() {
  let xmlContent = '';
  fetch('../logs/changelogs.xml').then((response) => {
    response.text().then((xml) => {
      xmlContent = xml;
      let parser = new DOMParser();
      let xmlDOM = parser.parseFromString(xmlContent, 'text/xml');
      let logs = xmlDOM.querySelectorAll("log");
      let logsHolder = document.getElementById('updates');
      console.log(xmlDOM)
      console.log(xmlContent)

      logs.forEach(bookXmlEntry => {
        const entryTitle = document.createElement("div");
        const entryDescription = document.createElement("p");
        const entryDate = document.createElement("p");

        entryTitle.className = "title";
        entryDate.className = "rightSided";

        entryTitle.innerText = bookXmlEntry.children[0].innerHTML;
        entryDescription.innerText = bookXmlEntry.children[1].innerHTML;
        entryDate.innerText = bookXmlEntry.children[2].innerHTML;

        logsHolder.append(entryTitle);
        logsHolder.append(entryDescription);
        logsHolder.append(entryDate);
      });
    });
  });
}

function addTab(tabsT, tabsContentT) {
  let tabs = document.querySelectorAll(tabsT);
  let tabsContent = document.querySelectorAll(tabsContentT);
  console.log(tabs)
  console.log(tabsContent)
  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      tabs.forEach(t => t.classList.remove('active'));
      tabsContent.forEach(content => {
        content.classList.add('hidden');
        content.style.display = 'none';
      })
      tab.classList.add('active');
      const activeTab = document.querySelector(`#${tab.getAttribute('data-tab')}`);
      activeTab.classList.remove('hidden');
      activeTab.style.display = 'block';
    })
  })
  tabs[0].classList.add('active');
  //tabContents[0].style.display = 'block';
}
function addCollapsible(className) {
  var coll = document.getElementsByClassName(className);
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
}