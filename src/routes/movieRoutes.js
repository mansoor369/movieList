const express =require("express")


const router = express.Router();


router.get("/",(req,res)=>{
    res.json({message:"hello"})
})

router.post("/",(req,res)=>{
    res.json({message:"hello"})
})

router.put("/",(req,res)=>{
    res.json({message:"hello"})
})

router.delete("/",(req,res)=>{
    res.json({message:"hello"})
})



module.exports  = router;