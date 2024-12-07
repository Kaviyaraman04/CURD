const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory data storage
let contacts = [];

// Create a new contact
app.post("/post", (req, res) => {
  const { name, email, phonenumber } = req.body;
  
  // Validate the fields
  if (!name || !email || !phonenumber) {
    return res.status(400).json({ message: "All fields (name, email, phonenumber) are required" });
  }

  const newContact = {
    id: contacts.length + 1,
    name,
    email,
    phonenumber,
  };

  contacts.push(newContact);
  res.status(201).json(newContact);
});

// Read all contacts
app.get("/getall", (req, res) => {
  res.json(contacts);
});

// Read a single contact by ID
app.get("/getbyid/:id", (req, res) => {
  const contact = contacts.find((c) => c.id === parseInt(req.params.id));
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.json(contact);
});

// Update a contact by ID
app.put("/update/:id", (req, res) => {
  const contact = contacts.find((c) => c.id === parseInt(req.params.id));
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }

  const { name, email, phonenumber } = req.body;

  // Validate the fields
  if (!name || !email || !phonenumber) {
    return res.status(400).json({ message: "All fields (name, email, phonenumber) are required" });
  }

  contact.name = name;
  contact.email = email;
  contact.phonenumber = phonenumber;

  res.json(contact);
});

// Delete a contact by ID
app.delete("/delete/:id", (req, res) => {
  const contactIndex = contacts.findIndex((c) => c.id === parseInt(req.params.id));
  if (contactIndex === -1) {
    return res.status(404).json({ message: "Contact not found" });
  }

  contacts.splice(contactIndex, 1);
  res.json({ message: "Contact deleted" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
