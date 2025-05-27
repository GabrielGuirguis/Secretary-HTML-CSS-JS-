function generateTimeOptions(intervalMinutes) {
    const select = document.getElementById("startTime");
    select.innerHTML = ""; // Clear previous options
  
    const now = new Date();
    const currentMinutes = now.getMinutes();
    // Round up to next interval
    const startMinutes = Math.ceil(currentMinutes / intervalMinutes) * intervalMinutes;
  
    for (let i = 0; i < (24 * 60) / intervalMinutes; i++) {
      const optionTime = new Date();
      optionTime.setHours(0, i * intervalMinutes, 0, 0);
      
      if (optionTime.getHours() < now.getHours() || (optionTime.getHours() === now.getHours() && optionTime.getMinutes() < startMinutes)) {
        // Skip past times
        continue;
      }
  
      const hours = optionTime.getHours().toString().padStart(2, '0');
      const minutes = optionTime.getMinutes().toString().padStart(2, '0');
      const label = `${hours}:${minutes}`;
  
      const option = document.createElement("option");
      option.value = label;
      option.textContent = label;
  
      select.appendChild(option);
    }
}
  