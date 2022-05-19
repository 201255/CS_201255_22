exports.succes=function(req,res,message,status)
{
    let statusCode=status || 200;
    let statusMessage=message || "";
    let error=false;

    res.status(status).send({
        error,
        statusCode,
        statusMessage
    })
}