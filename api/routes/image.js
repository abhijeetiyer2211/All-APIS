const express = require('express');
const router = express.Router();
const deepai  = require('deepai');
let image = '';
let captionList =[];
router.get('/', (req,res,next) => {
    deepai.setApiKey('4d24e2da-8259-4497-8db3-ca2ebf4b1d04');
    image = req.query.image;
    start();
    async function start() {
        var resp = await deepai.callStandardApi("densecap", {
            image: image,
        });
        // console.log(resp.output.captions);
        resp.output.captions.forEach(function(caption){
            if(caption.confidence >= 0.96)
            captionList.push(caption.caption);
        });
        res.status(200).json({
            Captions_predicted: captionList
        })
    }
});



module.exports = router;