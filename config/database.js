const {Sequelize} = require("sequelize")

const sequelize = new Sequelize({
    dialect:"sqlite",
    storage:"./pw3.sqlite",
    logging:false
});

(async()=>{
    try{
        await sequelize.authenticate();
        console.log("abriu o banco")
    }catch(error){
        console.error("erro ao abrir o banco",error)
    }
})

module.exports = sequelize;