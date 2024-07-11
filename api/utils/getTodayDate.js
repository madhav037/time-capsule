export function getTodaysDate() {
    const today = new Date();
  
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    // console.log(new Date(`${year}-${month}-${day}`))
    return `${year}-${month}-${day}`;
  }