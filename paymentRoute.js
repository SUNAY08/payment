const router = require('express').Router();
const Razorpay = require("razorpay");
const crypto = require('crypto');

const razorpayInstance = new Razorpay(
    {
        key_id : "rzp_test_exoqdZoZKq72aK",
        key_secret : "LOcUs17JpumKhGMrFrzNfRrn"
    }
);


router.post('/checkout', (req, res) => {
    // STEP 1:
    // console.log('req.body',req.body)
    const {amount,currency}  = req.body;      
          
    // STEP 2:    
    razorpayInstance.orders.create({amount, currency}, (err, order)=>{
        //   console.log('order',order)
          //STEP 3 & 4: 
          if(!err)
            res.send({status:200, message:"Success", order_id:order.id})
          else
            res.send(err);
        }
    )
})

router.post('/verify', (req, res) => {
    // STEP 1:
    // console.log('req.body...............',req.body)
    const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body; 
    
    const hmac = crypto.createHmac("sha256", "LOcUs17JpumKhGMrFrzNfRrn");
    // console.log('hmac',hmac)
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    // console.log('hmac50',hmac)
      
    // Creating the hmac in the required format
    const generated_signature = hmac.digest('hex');
      
    console.log('generated_signature',generated_signature,'razorpay_signature',razorpay_signature )

    if (generated_signature === razorpay_signature) {
        res.json({status:200, success:true, message:"Payment Success"})
    }
    else
    res.json({status: 400, success:false, message:"Payment failed"});
})

module.exports = router;