export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      if (req.query.transactionId && req.query.productId) {
        // Get one line item
        try {
          const response = await fetch(
            `https://intex2-backend.azurewebsites.net/api/Home/GetOneLineItem?transactionId=${req.query.transactionId}&productId=${req.query.productId}`
          );
          const lineItem = await response.json();
          res.status(200).json(lineItem);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch line item" });
        }
      } else if (req.query.searchTerm) {
        // Search line items
        try {
          const response = await fetch(
            `https://intex2-backend.azurewebsites.net/api/Home/SearchLineItems?searchTerm=${req.query.searchTerm}`
          );
          const lineItems = await response.json();
          res.status(200).json(lineItems);
        } catch (error) {
          res.status(500).json({ error: "Failed to search line items" });
        }
      } else {
        // Get all line items or filter line items
        try {
          const queryParams = new URLSearchParams(req.query).toString();
          const response = await fetch(
            `https://intex2-backend.azurewebsites.net/api/Home/${
              queryParams ? "FilterLineItems" : "GetAllLineItems"
            }?${queryParams}`
          );
          const lineItems = await response.json();
          res.status(200).json(lineItems);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch line items" });
        }
      }
      break;
    case "POST":
      // Create a line item
      try {
        const response = await fetch(
          "https://localhost:7102/api/Home/CreateLineItem",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
          }
        );
        const lineItem = await response.json();
        res.status(201).json(lineItem);
      } catch (error) {
        res.status(500).json({ error: "Failed to create line item" });
      }
      break;
    case "PUT":
      // Edit a line item
      try {
        const response = await fetch(
          `https://localhost:7102/api/Home/EditLineItem?id=${req.query.id}`,
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
        res.status(500).json({ error: "Failed to update line item" });
      }
      break;
    case "DELETE":
      // Delete a line item
      try {
        const response = await fetch(
          `https://localhost:7102/api/Home/DeleteLineItem?id=${req.query.id}`,
          {
            method: "DELETE",
          }
        );
        res.status(response.status).end();
      } catch (error) {
        res.status(500).json({ error: "Failed to delete line item" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
