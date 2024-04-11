export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      if (req.query.id) {
        // Get one product
        try {
          const response = await fetch(
              process.env.API_URI + `/api/Home/GetOneProduct?id=${req.query.id}`
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
              process.env.API_URI + `/api/Home/SearchProducts?searchTerm=${req.query.searchTerm}`
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
              process.env.API_URI + `/api/Home/${
              queryParams ? "FilterProducts" : "GetAllProducts"
            }?${queryParams}`, {
                mode: 'cors'
              }
          );
          const products = await response.json();
          res.json();
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch products" });
        }
      }

//     export async function getServerSideProps() {
//       process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// // Your fetch request here
//       try {
//         const agent = new https.Agent({
//           rejectUnauthorized: false, // Disable SSL verification
//         });
//         const response = await fetch("https://localhost:7102/api/Home/GetAllProducts", {
//           mode: "cors",
//         });
//         console.log("RESPONSE:", (await response.json()));
//         const { topProducts, recProducts } = (await response.json());
//         return {
//           props: {
//             topProducts,
//             // recProducts,
//           },
//         };
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//         return {
//           props: {
//             topProducts: [],
//             recProducts: [],
//           },
//         };
//       }
//     }




      break;
    case "POST":
      // Create a product
      try {
        const response = await fetch(
            process.env.API_URI + "/api/Home/CreateProduct",
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
            process.env.API_URI + `/api/Home/EditProduct?id=${req.query.id}`,
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
            process.env.API_URI + `/api/Home/DeleteProduct?id=${req.query.id}`,
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
