/**
 * @description:node mailer is used to send the mail from node js to our mail...
 */
const nodemailer=require('nodemailer');
/**
 * @description:sendmailfunction is used to send the mail
 * @param {url} url 
 */
exports.sendEMailFunction = (url,) => {
    /**
     * @description:createTransport is used to create transpoter details
     */
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:'sivachandrasekaran37@gmail.com',
            pass:''
        },
    });
    const mailOptions = {
        from:'sivachandrasekaran37@gmail.com',       
        to: 'sivachandrasekaran37@gmail.com',   
        subject: 'To send mail throw node',      
        text: 'Your Email verifaction link is:\n\n'+url 
    };
    /**
     * @description:it is used to send Mail 
     */
    transporter.sendMail(mailOptions,(err,info) => {
       
        if (err){
        console.log("is it is invalid");
        
            console.log("error on sending mail--", err)
        }
        else
            console.log('result of sending mail-- ',info);
    });
    
}