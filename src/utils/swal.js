import Swal from 'sweetalert2';

export default function showSwal(options) {
  const isDarkMode = document.documentElement.classList.contains('dark');

  return Swal.fire({
    background: isDarkMode ? '#2A3944' : '#fff',
    color: isDarkMode ? '#D6BECC' : '#000',
    iconColor: isDarkMode ? '#D6BECC' : undefined,
    ...options,
  });
}
