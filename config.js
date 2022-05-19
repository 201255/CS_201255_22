module.exports ={
    api: {
        port: process.env.API_PORT || 3000,
        
    },
    db: {
        pg: 5432,
        mysql: 3306
    }
}