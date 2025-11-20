export function convertDateToYYYYMMDD(dateString) {
  // Jika string kosong, null, atau undefined, kembalikan string kosong
  if (!dateString) return ""; 

  const months = {
    'Januari': '01', 'Februari': '02', 'Maret': '03', 'April': '04',
    'Mei': '05', 'Juni': '06', 'Juli': '07', 'Agustus': '08',
    'September': '09', 'Oktober': '10', 'November': '11', 'Desember': '12'
  };

  const parts = dateString.split(' '); // Hasil: ["12", "Desember", "1999"]
  
  // Jika format tidak sesuai, hentikan
  if (parts.length !== 3) return ""; 

  const day = parts[0].padStart(2, '0');
  const month = months[parts[1]]; // Dapatkan "12" dari "Desember"
  const year = parts[2];

  // Jika nama bulan tidak valid
  if (!month) return "";

  return `${year}-${month}-${day}`; // Hasil: "1999-12-12"
}