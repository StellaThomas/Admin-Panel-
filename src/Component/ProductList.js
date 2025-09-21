
// // export default ProductList;
// import React, { useEffect, useState } from "react";
// import API from "../api";
// import { Paper, Typography, Stack } from "@mui/material";

// function ProductList({ refreshKey }) {
//   const [products, setProducts] = useState([]);

//   const fetchProducts = () => {
//     API.get("/api/products")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Error fetching products:", err));
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [refreshKey]);

//   return (
//     <div style={{ padding: "20px" }}>
//       <Typography variant="h4" gutterBottom align="center">
//         🛍️ All Products
//       </Typography>

//       {products.length === 0 ? (
//         <Typography>No products found</Typography>
//       ) : (
//         <Stack direction="row" flexWrap="wrap" spacing={2} justifyContent="center">
//           {products.map((p) => (
//             <Paper
//               key={p._id}
//               elevation={3}
//               sx={{
//                 width: 250,
//                 p: 2,
//                 borderRadius: 3,
//                 textAlign: "center",
//                 boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//               }}
//             >
//               {/* Product Image */}
//               {p.image_url ? (
//                 <img
//                   src={p.image_url}
//                   alt={p.name}
//                   style={{
//                     width: "100%",
//                     height: "150px",
//                     objectFit: "cover",
//                     borderRadius: "8px",
//                     marginBottom: "10px",
//                   }}
//                   onError={(e) => {
//                     e.target.src = "https://via.placeholder.com/250x150?text=No+Image";
//                   }}
//                 />
//               ) : (
//                 <img
//                   src="https://via.placeholder.com/250x150?text=No+Image"
//                   alt="No Image"
//                   style={{
//                     width: "100%",
//                     height: "150px",
//                     objectFit: "cover",
//                     borderRadius: "8px",
//                     marginBottom: "10px",
//                   }}
//                 />
//               )}

//               {/* Product Info */}
//               <Typography variant="h6">{p.name.en}</Typography>
//               {p.name && (
//                 <Typography variant="subtitle2" color="text.secondary" sx={{ fontStyle: "italic" }}>
//                   {p.name.mr}
//                 </Typography>
//               )}
//               <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                 {p.description.en || "No description available"}
//               </Typography>
//               {p.description && (
//                 <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic", mt: 1 }}>
//                   {p.description.mr}
//                 </Typography>
//               )}
//               <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
//                 Price: ₹{p.price}
//               </Typography>
//               {p.dealer_price && (
//                 <Typography variant="body2" color="text.secondary">
//                   Dealer Price: ₹{p.dealer_price}
//                 </Typography>
//               )}
//               {p.franchise_price && (
//                 <Typography variant="body2" color="text.secondary">
//                   Franchise Price: ₹{p.franchise_price}
//                 </Typography>
//               )}
//               {p.quantity && (
//                 <Typography variant="body2" color="text.secondary">
//                   Quantity: {p.quantity}
//                 </Typography>
//               )}
//             </Paper>
//           ))}
//         </Stack>
//       )}
//     </div>
//   );
// }

// export default ProductList;


// // src/pages/ProductList.jsx
// import React, { useEffect, useState } from "react";
// import API from "../api";
// import { Paper, Typography, Stack, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
// import ProductForm from "../Component/ProductForm"; // adjust path if needed

// function ProductList({ refreshKey }) {
//   const [products, setProducts] = useState([]);
//   const [editingProduct, setEditingProduct] = useState(null);

//   const fetchProducts = () => {
//     API.get("/api/products")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Error fetching products:", err));
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [refreshKey]);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this product?")) return;
//     try {
//       await API.delete(`/api/products/${id}`);
//       setProducts((prev) => prev.filter((p) => (p._id || p.id) !== id));
//     } catch (err) {
//       console.error("Delete failed:", err);
//       alert("Delete failed — check console.");
//     }
//   };

//   const handleOpenEdit = (product) => {
//     setEditingProduct(product);
//   };

//   const handleAfterSave = () => {
//     // refresh list and close modal
//     fetchProducts();
//     setEditingProduct(null);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <Typography variant="h4" gutterBottom align="center">🛍️ All Products</Typography>

//       {products.length === 0 ? (
//         <Typography>No products found</Typography>
//       ) : (
//         <Stack direction="row" flexWrap="wrap" spacing={2} justifyContent="center">
//           {products.map((p) => (
//             <Paper
//               key={p._id || p.id}
//               elevation={3}
//               sx={{
//                 width: 250,
//                 p: 2,
//                 borderRadius: 3,
//                 textAlign: "center",
//                 boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//               }}
//             >
//               {/* Image */}
//               <img
//                 src={p.image_url || "https://via.placeholder.com/250x150?text=No+Image"}
//                 alt={p.name?.en || "product"}
//                 style={{
//                   width: "100%",
//                   height: "150px",
//                   objectFit: "cover",
//                   borderRadius: "8px",
//                   marginBottom: "10px",
//                 }}
//                 onError={(e) => (e.target.src = "https://via.placeholder.com/250x150?text=No+Image")}
//               />

//               {/* Info */}
//               <Typography variant="h6">{p.name?.en}</Typography>
//               {p.name?.mr && (
//                 <Typography variant="subtitle2" color="text.secondary" sx={{ fontStyle: "italic" }}>
//                   {p.name.mr}
//                 </Typography>
//               )}

//               <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                 {p.description?.en || "No description available"}
//               </Typography>
//               {p.description?.mr && (
//                 <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic", mt: 1 }}>
//                   {p.description.mr}
//                 </Typography>
//               )}

//               <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
//                 Price: ₹{p.price}
//               </Typography>
//               {p.dealer_price && <Typography variant="body2" color="text.secondary">Dealer Price: ₹{p.dealer_price}</Typography>}
//               {p.franchise_price && <Typography variant="body2" color="text.secondary">Franchise Price: ₹{p.franchise_price}</Typography>}
//               {p.quantity && <Typography variant="body2" color="text.secondary">Quantity: {p.quantity}</Typography>}

//               {/* Buttons */}
//               <Stack direction="row" spacing={1} justifyContent="center" mt={2}>
//                 <Button variant="outlined" onClick={() => handleOpenEdit(p)}>Update</Button>
//                 <Button variant="outlined" color="error" onClick={() => handleDelete(p._id || p.id)}>Delete</Button>
//               </Stack>
//             </Paper>
//           ))}
//         </Stack>
//       )}

//       {/* Edit dialog */}
//       <Dialog open={!!editingProduct} onClose={() => setEditingProduct(null)} maxWidth="md" fullWidth>
//         <DialogTitle>Update Product</DialogTitle>
//         <DialogContent>
//           {editingProduct && (
//             <ProductForm
//               editData={editingProduct}
//               onProductAdded={handleAfterSave} // after save refreshes list & closes modal
//             />
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default ProductList;







// src/pages/ProductList.jsx
import React, { useEffect, useState } from "react";
import { Paper, Typography, Stack, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import API from "../api";
import ProductForm from "../Component/ProductForm";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch all products
  const fetchProducts = () => {
    API.get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await API.delete(`/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => (p._id || p.id) !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed — check console.");
    }
  };

  // After Add/Update
  const handleAfterSave = () => {
    fetchProducts();
    setEditingProduct(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom align="center">
        🛍️ All Products
      </Typography>

      {/* Add Product Button */}
      <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => setEditingProduct({})}>
          + Add Product
        </Button>
      </Stack>

      {products.length === 0 ? (
        <Typography align="center">No products found</Typography>
      ) : (
        <Stack direction="row" flexWrap="wrap" spacing={2} justifyContent="center">
          {products.map((p) => (
            <Paper key={p._id || p.id} elevation={3} sx={{ width: 250, p: 2, borderRadius: 3, textAlign: "center" }}>
              <img
                src={p.image_url || "https://via.placeholder.com/250x150?text=No+Image"}
                alt={p.name?.en || "product"}
                style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }}
              />
              <Typography variant="h6">{p.name?.en}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {p.description?.en || "No description available"}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
                Price: ₹{p.price}
              </Typography>
              {p.dealer_price && <Typography variant="body2" color="text.secondary">Dealer Price: ₹{p.dealer_price}</Typography>}
              {p.franchise_price && <Typography variant="body2" color="text.secondary">Franchise Price: ₹{p.franchise_price}</Typography>}
              {p.quantity && <Typography variant="body2" color="text.secondary">Quantity: {p.quantity}</Typography>}
              <Stack direction="row" spacing={1} justifyContent="center" mt={2}>
                <Button variant="outlined" onClick={() => setEditingProduct(p)}>Update</Button>
                <Button variant="outlined" color="error" onClick={() => handleDelete(p._id || p.id)}>Delete</Button>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}

      {/* Dialog for Add / Update */}
      <Dialog open={!!editingProduct} onClose={() => setEditingProduct(null)} maxWidth="md" fullWidth>
        <DialogTitle>{editingProduct && editingProduct._id ? "Update Product" : "Add Product"}</DialogTitle>
        <DialogContent>
          <ProductForm editData={editingProduct} onProductAdded={handleAfterSave} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
