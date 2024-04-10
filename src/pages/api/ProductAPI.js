export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      if (req.query.id) {
        // Get one product
        try {
          const response = await fetch(
            `http://localhost:7102/api/Home/GetOneProduct?id=${req.query.id}`
          );
          const product = await response.json();
          res.status(200).json(product);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch product" });
        }
      } else if (req.query.searchTerm) {
        // Search products
        try {
          const response = await fetch(
            `http://localhost:7102/api/Home/SearchProducts?searchTerm=${req.query.searchTerm}`
          );
          const products = await response.json();
          res.status(200).json(products);
        } catch (error) {
          res.status(500).json({ error: "Failed to search products" });
        }
      } else {
        // Get all products or filter products
        try {
          const queryParams = new URLSearchParams(req.query).toString();
          const response = await fetch(
            `http://localhost:7102/api/Home/${
              queryParams ? "FilterProducts" : "GetAllProducts"
            }?${queryParams}`
          );
          const products = await response.json();
          res.status(200).json(products);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch products" });
        }
      }
      break;
    case "POST":
      // Create a product
      try {
        const response = await fetch(
          "http://localhost:7102/api/Home/CreateProduct",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
          }
        );
        const product = await response.json();
        res.status(201).json(product);
      } catch (error) {
        res.status(500).json({ error: "Failed to create product" });
      }
      break;
    case "PUT":
      // Edit a product
      try {
        const response = await fetch(
          `http://localhost:7102/api/Home/EditProduct?id=${req.query.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
          }
        );
        res.status(response.status).end();
      } catch (error) {
        res.status(500).json({ error: "Failed to update product" });
      }
      break;
    case "DELETE":
      // Delete a product
      try {
        const response = await fetch(
          `http://localhost:7102/api/Home/DeleteProduct?id=${req.query.id}`,
          {
            method: "DELETE",
          }
        );
        res.status(response.status).end();
      } catch (error) {
        res.status(500).json({ error: "Failed to delete product" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
