
const asyncHandler = (requestHandler) => {
    (req,res,next)=>{
        Promise.resolve(requestHandler()).catch((err)=>next(err));
    }
} 
//via promises


/*const asyncHandler = (fn) = async(req,res,next) => {
    try {
        await fn(req,res,next);
    } catch (error) {
        res.status(err.code || 500).json({
            success:false,
            message:error.message
        });
    }
//vis try and catch
} */
export {asyncHandler}