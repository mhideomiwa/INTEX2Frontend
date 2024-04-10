export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      if (req.query.id) {
        // Get one customer
        try {
          const response = await fetch(
            `https://localhost:7102/api/Home/GetOneCustomer?id=${req.query.id}`
          );
          const customer = await response.json();
          res.status(200).json(customer);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch customer" });
        }
      } else if (req.query.searchTerm) {
        // Search customers
        try {
          const response = await fetch(
            `https://localhost:7102/api/Home/SearchCustomers?searchTerm=${req.query.searchTerm}`
          );
          const customers = await response.json();
          res.status(200).json(customers);
        } catch (error) {
          res.status(500).json({ error: "Failed to search customers" });
        }
      } else {
        // Get all customers or filter customers
        try {
          const queryParams = new URLSearchParams(req.query).toString();
          const response = await fetch(
            `https://localhost:7102/api/Home/${
              queryParams ? "FilterCustomers" : "GetAllCustomers"
            }?${queryParams}`
          );
          const customers = await response.json();
          res.status(200).json(customers);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch customers" });
        }
      }
      break;
    case "POST":
      // Create a customer
      try {
        const response = await fetch(
          "https://localhost:7102/api/Home/CreateCustomer",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
          }
        );
        const customer = await response.json();
        res.status(201).json(customer);
      } catch (error) {
        res.status(500).json({ error: "Failed to create customer" });
      }
      break;
    case "PUT":
      // Edit a customer
      try {
        const response = await fetch(
          `https://localhost:7102/api/Home/EditCustomer?id=${req.query.id}`,
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
        res.status(500).json({ error: "Failed to update customer" });
      }
      break;
    case "DELETE":
      // Delete a customer
      try {
        const response = await fetch(
          `https://localhost:7102/api/Home/DeleteCustomer?id=${req.query.id}`,
          {
            method: "DELETE",
          }
        );
        res.status(response.status).end();
      } catch (error) {
        res.status(500).json({ error: "Failed to delete customer" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
