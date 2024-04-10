export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      if (req.query.id) {
        // Get one order
        try {
          const response = await fetch(
            `https://localhost:7102/api/Home/GetOneOrder?id=${req.query.id}`
          );
          const order = await response.json();
          res.status(200).json(order);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch order" });
        }
      } else if (req.query.searchTerm) {
        // Search orders
        try {
          const response = await fetch(
            `https://localhost:7102/api/Home/SearchOrders?searchTerm=${req.query.searchTerm}`
          );
          const orders = await response.json();
          res.status(200).json(orders);
        } catch (error) {
          res.status(500).json({ error: "Failed to search orders" });
        }
      } else {
        // Get all orders or filter orders
        try {
          const queryParams = new URLSearchParams(req.query).toString();
          const response = await fetch(
            `https://localhost:7102/api/Home/${
              queryParams ? "FilterOrders" : "GetAllOrders"
            }?${queryParams}`
          );
          const orders = await response.json();
          res.status(200).json(orders);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch orders" });
        }
      }
      break;
    case "POST":
      // Create an order
      try {
        const response = await fetch(
          "https://localhost:7102/api/Home/CreateOrder",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
          }
        );
        const order = await response.json();
        res.status(201).json(order);
      } catch (error) {
        res.status(500).json({ error: "Failed to create order" });
      }
      break;
    case "PUT":
      // Edit an order
      try {
        const response = await fetch(
          `https://localhost:7102/api/Home/EditOrder?id=${req.query.id}`,
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
        res.status(500).json({ error: "Failed to update order" });
      }
      break;
    case "DELETE":
      // Delete an order
      try {
        const response = await fetch(
          `https://localhost:7102/api/Home/DeleteOrder?id=${req.query.id}`,
          {
            method: "DELETE",
          }
        );
        res.status(response.status).end();
      } catch (error) {
        res.status(500).json({ error: "Failed to delete order" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
