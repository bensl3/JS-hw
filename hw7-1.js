/*
Apply style to a div element based on a form with style options. Update
  whenever there is a change in form selections.
Expected form has radio buttons for background color, checkboxes for text style,
  and a select element for font size.
*/
const styledDiv = document.getElementById('styled_div');
const styleForm = document.getElementById('style_form');

styleForm.addEventListener('change', () => {
  styledDiv.style.backgroundColor = styleForm.elements['background'].value;
  
  const textStyles = styleForm.elements['text_style'];
  for (let i = 0; i < textStyles.length; i++) {
    switch (textStyles[i].value) {
      case 'underline':
        styledDiv.style.textDecoration = textStyles[i].checked ? 'underline' : '';
        break;
      case 'bold':
        styledDiv.style.fontWeight = textStyles[i].checked ? 'bold' : '';
        break;
      case 'italic':
        styledDiv.style.fontStyle = textStyles[i].checked ? 'italic' : '';
        break;          
    }
  }

  styledDiv.style.fontSize = styleForm.elements['font_size'].value;
});
