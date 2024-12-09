export default function decorate(block) {
  const innerDivs = block.querySelectorAll('div > div');

  if (innerDivs.length < 2) {
    return;
  }

  const titleDiv = innerDivs[0];
  const followText = titleDiv.querySelector('p')?.textContent || '';

  const iconsDiv = innerDivs[2];
  const socialIcons = Array.from(iconsDiv.querySelectorAll('a'));

  block.innerHTML = '';

  const titleElement = document.createElement('p');
  titleElement.textContent = followText;
  block.appendChild(titleElement);

  const iconsContainer = document.createElement('div');
  iconsContainer.classList.add('social-icons');

  socialIcons.forEach((icon) => {
    iconsContainer.appendChild(icon);
  });

  block.appendChild(iconsContainer);
}
