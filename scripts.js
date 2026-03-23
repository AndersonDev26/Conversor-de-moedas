    const convertbutton = document.querySelector(".convert-button")
    const currencyselect = document.querySelector(".currency-select")

    function convertvalues(){
        const inputcurrencyvalue = document.querySelector(".input-curency").value
        const currencyvaluetoconvert = document.querySelector(".currency-value-to-convert")
        const currencyvalueconverted = document.querySelector(".currency-value")

        console.log(currencyselect.value)

        const dolartoday = 5.2836
        const eurotoday = 6.1243

        

        if (currencyselect.value == "dolar"){
             currencyvalueconverted.innerHTML = new Intl.NumberFormat("en-us", {
            style:"currency",
            currency:"USD"
        }).format(inputcurrencyvalue / dolartoday)
        }

        if (currencyselect.value == "euro"){
            currencyvalueconverted.innerHTML = new Intl.NumberFormat("de-DE", {
                style:"currency",
                currency:"EUR"
            }).format(inputcurrencyvalue/eurotoday)

        }

        currencyvaluetoconvert.innerHTML = new Intl.NumberFormat("pt-BR", {
            style:"currency",
            currency:"BRL"
        }).format(inputcurrencyvalue)

       
     
        
    }

    function changecurrency (){
        const currencyname = document.getElementById("currency-name")
        const currencyimg = document.querySelector(".usa")


        if(currencyselect.value == "dolar") {
            currencyname.innerHTML = "Dólar"
            currencyimg.src = "./assets/usa.png"
        }


         if(currencyselect.value == "euro") {
            currencyname.innerHTML = "Euro"
            currencyimg.src = "./assets/euro (3).png"
        }

        convertvalues()
    }



    currencyselect.addEventListener("change", changecurrency)
    convertbutton.addEventListener("click", convertvalues )