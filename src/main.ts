import { app } from "./applications/app";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`);
});
