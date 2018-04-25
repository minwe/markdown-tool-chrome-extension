/**
 * 右键菜单扩展
 */

chrome.contextMenus.create({
  title: 'Get Markdown Link',
  contexts: ['page', 'selection', 'link', 'image'],
  onclick: (info, tab) => {
    const { linkUrl, pageUrl, srcUrl, selectionText } = info;
    // selection 时有选中的文字
    const selection = selectionText && selectionText.trim();
    const title = selection ? selection : tab.title;
    // `link` context 有 `linkUrl` 属性
    const url = linkUrl ? linkUrl : pageUrl;
    let mdLink = `[${title}](${url})`;

    // image
    if (srcUrl) {
      mdLink = `![](${srcUrl})`;
    }

    console.log('Item ' + info.menuItemId + ' was clicked');
    console.log('Info: --->', info, JSON.stringify(info));
    console.log('Markdown link: ---> ', mdLink);

    copyToClipboard(mdLink);
  },
});

function copyToClipboard(text) {
  const input = document.createElement('input');

  input.style.position = 'absolute';
  input.style.opacity = 0;
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  document.body.removeChild(input);
}
