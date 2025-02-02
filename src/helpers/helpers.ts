export const createChatId = (id1: string, id2: string): string => {
    return [id1, id2]
      .sort((a, b) => a.localeCompare(b)) // Sort the IDs
      .join("_"); // Join them with an underscore
  };