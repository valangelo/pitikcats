export function formatDate(dateString: string | null): string {
    if (!dateString) return "Date unknown"; // Return a default value if the date string is null or empty
    
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return ""; // Return a fallback string for invalid date
    }
  
    // Get the full date and time parts
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  
    const timeFormatter = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // 12-hour format
    });
  
    // Format date and time separately
    const dateFormatted = dateFormatter.format(date);
    const timeFormatted = timeFormatter.format(date);
  
    // Combine the date and time without the "at" string
    return `${dateFormatted} ${timeFormatted}`;
  }
  