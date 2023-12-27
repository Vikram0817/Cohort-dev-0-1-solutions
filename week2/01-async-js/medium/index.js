// let fs = require("fs");

fs.readFile("./file.txt", "utf-8", function(err, data){
    let newData = data.split(" ");
    newData = newData.filter(val => val != "").join(" ");
    fs.writeFile("./file.txt", newData,() =>
          console.log('File written successfully.')
    )
});


let out = setInterval(() => {
    var d = new Date();
    console.log(d.toLocaleTimeString())
}, 1000);
