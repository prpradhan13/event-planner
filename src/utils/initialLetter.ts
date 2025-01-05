

const getInitialLetter = (fullName: any) => {
    if (!fullName) return "";
    const nameParts = fullName.split(" ");
    return nameParts.length === 1
      ? fullName.slice(0, 2).toUpperCase()
      : nameParts
          .map((name: any) => name[0])
          .join("")
          .toUpperCase();
};

export default getInitialLetter;