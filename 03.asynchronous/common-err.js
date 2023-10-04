export const handleError = (err) => {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    throw err;
  }
};
