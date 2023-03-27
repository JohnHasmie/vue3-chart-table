function repairJSON(jsonString) {
    let result = jsonString;
    // Add missing commas
    result = result.replace(/([}\]])\s*([^\]}{[,:])/g, '$1,$2');
    // Remove trailing commas
    result = result.replace(/,\s*([\]}])/g, '$1');
    
    try {
      return JSON.parse(result);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      return null;
    }
}
  
export { repairJSON };
  