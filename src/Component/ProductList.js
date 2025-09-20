
// export default ProductList;
import React, { useEffect, useState } from "react";
import API from "../api";
import { Paper, Typography, Stack } from "@mui/material";

function ProductList({ refreshKey }) {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    API.get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshKey]);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom align="center">
        🛍️ All Products
      </Typography>

      {products.length === 0 ? (
        <Typography>No products found</Typography>
      ) : (
        <Stack direction="row" flexWrap="wrap" spacing={2} justifyContent="center">
          {products.map((p) => (
            <Paper
              key={p._id}
              elevation={3}
              sx={{
                width: 250,
                p: 2,
                borderRadius: 3,
                textAlign: "center",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              {/* Product Image */}
              {p.image_url ? (
                <img
                  src={p.image_url}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/250x150?text=No+Image";
                  }}
                />
              ) : (
                <img
                  src="https://via.placeholder.com/250x150?text=No+Image"
                  alt="No Image"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
              )}

              {/* Product Info */}
              <Typography variant="h6">{p.name.en}</Typography>
              {p.name && (
                <Typography variant="subtitle2" color="text.secondary" sx={{ fontStyle: "italic" }}>
                  {p.name.mr}
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {p.description.en || "No description available"}
              </Typography>
              {p.description && (
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic", mt: 1 }}>
                  {p.description.mr}
                </Typography>
              )}
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
                Price: ₹{p.price}
              </Typography>
              {p.dealer_price && (
                <Typography variant="body2" color="text.secondary">
                  Dealer Price: ₹{p.dealer_price}
                </Typography>
              )}
              {p.franchise_price && (
                <Typography variant="body2" color="text.secondary">
                  Franchise Price: ₹{p.franchise_price}
                </Typography>
              )}
              {p.quantity && (
                <Typography variant="body2" color="text.secondary">
                  Quantity: {p.quantity}
                </Typography>
              )}
            </Paper>
          ))}
        </Stack>
      )}
    </div>
  );
}

export default ProductList;
