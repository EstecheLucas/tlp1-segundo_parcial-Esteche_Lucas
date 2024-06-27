const express = require('express');
const app = express();
const data = require('./database.js');

app.use(express.json())

//Devuelve todos los productos
app.get('/products', (req, res) => {
    res.send(data);
});

//Devuelve un solo producto por id
app.get("/products/:id", (req, res) => {
    const id = req.params.id
    res.json(data[id - 1])
})


//agrega un nuevo producto con un id nuevo
app.post("/products", (req, res) => {
    const { name,quantity,price } = req.body
    const id = data.length + 1
    data.push({ id, name, quantity, price })
    res.json({ messege: "Se agrego correctamente" })
})  


//Edita o actualiza un producto
app.put("/products/:id", (req, res) => {
    const { id } = req.params
    const { name,quantity,price } = req.body
    const index = data.findIndex(item => item.id == id)
    if (index !== -1) {
        data[index] = { id, name, quantity, price }
        res.json({ messege: "Se actualizo correctamente" })
    } else {
        res.json({ messege: "No se pudo actualizar" })
    }
})


//Elimina un producto
app.delete("/products/:id", (req, res) => {
    const { id } = req.params
    const index = data.findIndex(item => item.id == id)
    if (index !== -1) {
        data.splice(index, 1)
        res.json({ messege: "Se elimino correctamente" })
    } else {
        res.json({ messege: "No se pudo eliminar" })
    }
})  







app.listen(3000, () => console.log('servidor corriendo en ek puerto 3000'));
