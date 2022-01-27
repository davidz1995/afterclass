const express = require('express');
const router = express.Router();
const {Product} = require('../models/products');

router.get(`/`,async (req, res) =>{
    const productList = await Product.find()
    !productList? res.status(500).send('Product not found'):res.status(201).send(productList)
})

router.get('/:id', async (req,res) => {
    const product = await Product.findById(req.params.id)
    !product? res.status(500).send('Product not found'):res.status(201).send(product);
})

router.post(`/`,async (req, res) =>{
    let product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock,
        description: req.body.description,
        price: req.body.price
    })

    product = await product.save()
    !product? res.status(500).send('Product not created'):res.status(200).send(product)
})

router.delete('/:id',(req,res) => {
    Product.findByIdAndRemove(req.params.id).then(product => {
        product? res.status(200).json({
            success: true,
            message: 'Product deleted'
        }) :
        res.status(404).json({
            succes:false,
            message:'Product not found'
        })
    })
    .catch(err => {
        return res.status(400).json({
            success:false,
            error:err
        })
    })
})

module.exports = router