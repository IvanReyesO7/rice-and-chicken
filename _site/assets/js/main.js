$(document).ready(function() {

  // On load, respects saved preference or system default
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme) {
    $('html').attr('data-theme', savedTheme);
  }

  $('#title-theme-toggle-btn').on('click', function() {
    const currentTheme = $('html').attr('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    $('html').attr('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
});