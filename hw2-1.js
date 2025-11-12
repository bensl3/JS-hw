/*
Insert HTML to display:
  - the letters xy in strong font, with font family Times New Roman, and the color red
  - the numbers 12 in blue color and font family Arial
  - the numbers 89 in green color, emphasized, and font family Impact
*/
function buildStyledText(text, color, fontFamily, textTag) {
  let colorStyle = '';
  if (color !== '') {
    colorStyle = 'color:' + color + ';';
  }

  let fontFamilyStyle = '';
  if (fontFamily !== '') {
    fontFamilyStyle = "font-family:'" + fontFamily + "';";
  }

  let spanOpen = '';
  let spanClose = '';
  if (colorStyle !== '' || fontFamilyStyle !== '') {
    spanOpen = '<span style="' + colorStyle + fontFamilyStyle + '">';
    spanClose = '</span>';
  }

  let textTagOpen = '';
  let textTagClose = '';
  if (textTag !== '') {
    textTagOpen = '<' + textTag + '>';
    textTagClose = '</' + textTag + '>';
  }

  return spanOpen + textTagOpen + text + textTagClose + spanClose;
}

const styledText = buildStyledText('xy', 'red', 'Times New Roman', 'strong')
  + ' ' + buildStyledText('12', 'blue', 'Arial', '')
  + ' ' + buildStyledText('89', 'green', 'Impact', 'em');

document.getElementById('javascript_output').innerHTML = styledText;