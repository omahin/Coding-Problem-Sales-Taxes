const taxes = require('./src/controllers/taxesController')
const inputs = require('./src/models/inputs.json')

function doIt(taxes) {
    
    const obj = taxes.getProducts()
    
    for(var i in obj) {

        console.log(obj[i].quantity+((obj[i].imported) ? ' imported' : '')+' '+obj[i].name+': '+obj[i].priceTaxed)
    }
    //Print the total sales taxes
    console.log("Sales Taxes: "+ taxes.calcTotalSalesTaxes())
    //Print the total prices
    console.log("Total: "+ taxes.calcTotalPrices())
    //Empty the cart
    taxes.emptyProducts()
}

for(var i in inputs) {
    console.log("\n"+i.toUpperCase()); //insert de name OUTPUT at the console
    inputs[i].forEach(function(product) {
        //Add product to cart
        taxes.addProduct(product.name, product.quantity, product.excepted, product.imported, product.price)
    })
    //Print the informations
    doIt(taxes)
}