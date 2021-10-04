module.exports = (function() {
    let products = []
    
    const totalSum = function(field){
        if(typeof field !== 'string')
            throw new Error('field must be a string type')
        let sum = 0
        
        for(var i in products) {
            sum = parseFloat(sum) + parseFloat(products[i][field])
        }
            
        return parseFloat(sum).toFixed(2)
    }
    
    const calcPriceTaxed = (quantity, price, tax) => {
        if( typeof quantity !== 'number'    ||
            typeof price    !== 'number'    ||
            typeof tax      !== 'number')
                throw new Error('Wrong type of parameters')
        
        const tValue = parseFloat((price) * tax / 100)
        const nearest = parseFloat((Math.round( tValue / 0.05)) * 0.05)
        const result = parseFloat(price) + parseFloat(nearest)
        return (quantity * result).toFixed(2)
    }
    
    
    const calcSalesTaxes = (quantity, price, priceTaxed) => parseFloat(parseFloat(priceTaxed) - (parseFloat(price) * quantity)).toFixed(2)
    
     return {
      
        addProduct: (name, quantity, excepted, imported, price) => {
            
            if( typeof name     !== 'string'    ||
                typeof quantity !== 'number'    ||
                typeof excepted !== 'boolean'   ||
                typeof imported !== 'boolean'   ||
                typeof price    !== 'number')
                    throw new Error('Wrong type of parameters')
            
            let tax = 0
            
            if(!excepted) {
                tax = tax + 10
            }
    
            if(imported) {
                tax = tax + 5
            }
            
            const priceTaxed = ((excepted && !imported) ? (quantity * price) : calcPriceTaxed(quantity, price, tax))
            const salesTaxes = ((excepted && !imported) ? 0 : calcSalesTaxes(quantity, price, priceTaxed))
            
            var product = {
                name: name,
                quantity: quantity,
                excepted: excepted,
                imported: imported,
                price: price,
                tax: tax,
                priceTaxed: priceTaxed,
                salesTaxes: salesTaxes
            }
        
            products.push(product)
            
        },
        
        calcTotalSalesTaxes: () => parseFloat(totalSum("salesTaxes")),
        
        calcTotalPrices: () => parseFloat(totalSum("priceTaxed")),
        
        getProducts: () => products,
        
        emptyProducts: () => { products = [] }
    }
}())