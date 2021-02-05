const nodemailer = require('nodemailer');

const dotenv = require('dotenv')
dotenv.config({ path: "./config.env" });

const websiteLink = process.env.NODE_ENV === "production" ? process.env.WEBSITE_URL : process.env.FRONTEND_PORT;
const collection_address = "Infinity Nails, 121 high road, Beeston, NG9 2LH";

const EmailNoReply = () => nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_NOREPLY,
        pass: process.env.EMAIL_PASSWORD,
    }
})

const Email = () => nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    }
})

const footer = `
<footer>
    <p>The Cake Dilemma est. 2020. @<a href=${websiteLink}>Thecakedilemma.com</a>. Please do not respond to this email. 
    <br/>
    For any enquiries, contact us by Email: <a href="mailto:thecakedilemma@gmail.com">thecakedilemma@gmail.com</a>
    or Whatsapp: <a target="_blank" rel="noreferrer" href="https://wa.me/+447838328990">+447838328990</a>
    <br/>
    Our Social Links - 
    <a href="https://www.instagram.com/thecakedilemma/">Instagram</a> - 
    <a href="https://www.facebook.com/thecakedilemma">Facebook</a>
    </p>
</footer>
`

const footer_reply = `
<footer>
    <p>The Cake Dilemma est. 2020. @<a href=${websiteLink}>Thecakedilemma.com</a>
    <br/>
    For any enquiries, contact us by Email: <a href="mailto:thecakedilemma@gmail.com">thecakedilemma@gmail.com</a>
    Or Whatsapp: <a target="_blank" rel="noreferrer" href="https://wa.me/+447838328990">+447838328990</a>
    <br/>
    Our Social Links - 
    <a href="https://www.instagram.com/thecakedilemma/">Instagram</a> - 
    <a href="https://www.facebook.com/thecakedilemma">Facebook</a>
    </p>
</footer>
`

const main_style = `
    html { font-family: 'Assistant', 'Arial', 'sans-serif'; text-align: center; padding: 1rem}
    body {background-color: white}
    .logo{ width: 40%; height:auto }
    footer{padding: 0.3rem; background: #ffdab9; margin-top: 10rem; font-size: 1rem}
    table{ max-width: 600px; text-align: center; margin: 2rem auto;}
`

exports.emailConfirmation = async options => {
    const transporter = EmailNoReply()

    const mailOptions = {
        from: 'Cake Dilemma <thecakedilemma.noreply@gmail.com>',
        to: options.email,
        subject: "Email Confirmation Code",
        html:`
    <html>
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@200;400;600&display=swap" rel="stylesheet">
            <style>
                ${main_style}
                h3{margin-bottom: 4rem}
                .code{font-size: 30px}
            </style>
        </head>
        
        <body> 
        <table>
            <tr>
                <th>
                    <a href=${websiteLink}><img class="logo" src="https://firebasestorage.googleapis.com/v0/b/cakedilemma.appspot.com/o/main%2Flogo2.png?alt=media&token=b22ffdda-5bc4-4bdf-8d5d-c1cf5102d572" /></a>
                </th>
            </tr>
            <tr>
                <td>
                    <h3>Email Confirmation Code</h3>
                    <p class="code">${options.code}</p>
                </td>
            </tr>
        </table>
    
        ${footer}
        </body>
    </html>
    `
    }
    await transporter.sendMail(mailOptions)
}

exports.sendForgotPasswordEmail = async options => {
    const transporter = EmailNoReply()

    const mailOptions = {
        from: 'Cake Dilemma <thecakedilemma.noreply@gmail.com>',
        to: options.email,
        subject: "Reset Password Link",
        html: `
    <html>
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@200;400;600&display=swap" rel="stylesheet">
            <style>
                ${main_style}
                .reset_link {color: black; text-decoration: none; padding: 1rem 2rem; border: 1px solid #ffdab9; }
                .reset_link:hover {color: white;background: #ffdab9; }
                h3{margin-bottom: 4rem}
            </style>
        </head>
        
        <body> 
        <table>
            <tr>
                <th>
                    <a href=${websiteLink}><img class="logo" src="https://firebasestorage.googleapis.com/v0/b/cakedilemma.appspot.com/o/main%2Flogo2.png?alt=media&token=b22ffdda-5bc4-4bdf-8d5d-c1cf5102d572" /></a>
                </th>
            </tr>
            <tr>
                <td>
                    <h3>Password Reset Request - please do not reply to this email.</h3>
                    <p><a class="reset_link" href=${options.url}>Click me to reset password</a></p>
                </td>
            </tr>
        </table>
    
        ${footer}
        </body>
    </html>
    `
    }
    await transporter.sendMail(mailOptions)
}

exports.sendOrderEmail = async options => {
    const transporter = EmailNoReply()

    const mailOptions = {
        from: 'Cake Dilemma <thecakedilemma@gmail.com>',
        to: options.email,
        subject: "Order Confirmation",
        html: `
    <html>
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@200;400;600&display=swap" rel="stylesheet">
            <style>
                ${main_style}
                .order-item p { text-align: left; width: 100%}
                .product {text-align: left; width: 100%;}
                .product td {border-bottom: 1px solid #ffdab9; padding: 0.5rem 0}
                .grand-total{text-align: right}
                .grand-total p {padding-right: 1rem}
                .order-information p {text-align: left;}
                .order-information {width: 100%}
                .message {padding-bottom: 3rem; padding-top: 2rem}
            </style>
        </head>
        <body>
            
        <table>
            <tr>
                <th> <a href=${websiteLink}><img class="logo" src="https://firebasestorage.googleapis.com/v0/b/cakedilemma.appspot.com/o/main%2Flogo2.png?alt=media&token=b22ffdda-5bc4-4bdf-8d5d-c1cf5102d572" /></a></th>
            </tr>
            <tr>
                <td>
                    <h2>Thank you for your purchase</h2>
                    <p>Hi ${options.data.first_name} ${options.data.last_name}, we have received your order.</p>
                    <h3>Your Order ID : ${options.data.id}</h3>
                </td>
            </tr>
        </table>
            
        <table class="product">
            <tr>
                <th></th>
                <th></th>
            </tr>
            ${options.data.order.map((el) => 
                `
                <tr> 
                    <td><p>${el.title} <br> ${el.size} ${el.flavour} <br> Qty: ${el.quantity} </p> </td>
                    <td><p>£${Number(el.total).toFixed(2)}</p></td>
                </tr> 
                `
                )}
            <tr>
                <td class="grand-total"> <p>Shipping<br>Discount<br>Gift Card<br>Total</p> </td>
                <td> <p>£${Number(options.data.postage).toFixed(2)}<br>£${Number(options.data.discount_value).toFixed(2)}<br>£${Number(options.data.gift_card_value).toFixed(2)}<br>£${Number(options.data.grand_total).toFixed(2)}</p></td>
            </tr>
        </table>
        
        <table class="order-information">
            <tr>
                <th></th>
                <th></th>
            </tr>
            <tr>
                <td class="message"><p>${options.data.message ? `Message : ${options.data.message}` : "" }</p></td>
            </tr>
            <tr>
                <td><h2>Order Information</h2></td>
            </tr>
            <tr>
                <td>
                    <p>
                    Order ID - ${options.data._id} <br>
                    Date - ${options.data.date} <br>
                    Name - ${options.data.first_name} ${options.data.last_name} <br>
                    Method - ${options.data.method} <br><br>
                    ${options.data.method === "Delivery" ? "Delivery Address" : "Collection Address"} - ${options.data.method === "Delivery" ? `${options.data.address_1}, ${options.data.address_2}, ${options.data.city}, ${options.data.postcode}` :  `${collection_address}`}
                    </p> 
                </td>
            </tr>
        </table>
    
    
        ${footer}
        </body>
    </html>
    `
    }
    await transporter.sendMail(mailOptions)
}

exports.sendOrderAlertEmail = async options => {
    const transporter = Email()

    const mailOptions = {
        from: 'Cake Dilemma <thecakedilemma@gmail.com>',
        to: process.env.EMAIL,
        subject: "New Order",
        html: `
    <html>
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@200;400;600&display=swap" rel="stylesheet">
            <style>
                ${main_style}
            </style>
        </head>
        
        <body> 
        <table>
            <tr>
                <th>
                    <a href=${websiteLink}><img class="logo" src="https://firebasestorage.googleapis.com/v0/b/cakedilemma.appspot.com/o/main%2Flogo2.png?alt=media&token=b22ffdda-5bc4-4bdf-8d5d-c1cf5102d572" /></a>
                </th>
            </tr>
            <tr>
                <td>
                    <h3>Order Confirmation</h3>
                    <p>Name: ${options.data.first_name} ${options.data.last_name}</p>
                    <p>Order ID: ${options.data._id}</p>
                    <p>Method: ${options.data.method}</p>
                    <p>Date: ${options.data.date}</p>
                </td>
            </tr>
        </table>
    
        ${footer}
        </body>
    </html>
    `
    }
    await transporter.sendMail(mailOptions)
}


exports.EmailOrderIsReady = async options => {
    const transporter = EmailNoReply()

    const mailOptions = {
        from: 'Cake Dilemma <thecakedilemma.noreply@gmail.com>',
        to: options.email,
        subject: options.subject,
        html:`
    <html>
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@200;400;600&display=swap" rel="stylesheet">
            <style>
                ${main_style}
                h3{margin-bottom: 5rem}
                .message{font-size: 18px}
            </style>
        </head>
        
        <body> 
        <table>
            <tr>
                <th>
                    <a href=${websiteLink}><img class="logo" src="https://firebasestorage.googleapis.com/v0/b/cakedilemma.appspot.com/o/main%2Flogo2.png?alt=media&token=b22ffdda-5bc4-4bdf-8d5d-c1cf5102d572" /></a>
                </th>
            </tr>
            <tr>
                <td>
                    <h1>${options.title}</h1>
                    <p> Order ID: ${options.id}</p>
                    <p class="message">${options.message}</p>
                </td>
            </tr>
        </table>
    
        ${footer_reply}
        </body>
    </html>
    `
    }
    await transporter.sendMail(mailOptions)
}


exports.contactEmail = async options => {
    const transporter = Email()

    const mailOptions = {
        from: 'Cake Dilemma <thecakedilemma@gmail.com>',
        to: process.env.EMAIL,
        subject: "Message",
        replyTo: options.email,
        html: `
        <html>
            <head>
            <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@200;400;600&display=swap" rel="stylesheet">
            <style>
                ${main_style}
            </style>
            </head>
            <body> 
                <table>
                <tr>
                    <th>
                        <a href=${websiteLink}><img class="logo" src="https://firebasestorage.googleapis.com/v0/b/cakedilemma.appspot.com/o/main%2Flogo2.png?alt=media&token=b22ffdda-5bc4-4bdf-8d5d-c1cf5102d572" /></a>
                    </th>
                </tr>
                <tr>
                    <td>
                        <h3>Message:</h3>
                        <p>${options.message} </p>
                    </td>
                </tr>
                </table>
                ${footer_reply}
            </body>
        </html>
    `
    }
    await transporter.sendMail(mailOptions)
}

// send a receipt to the gift card buyer
exports.sendGiftCardToBuyerEmail = async options => {
    const transporter = EmailNoReply()

    const mailOptions = {
        from: 'Cake Dilemma <thecakedilemma.noreply@gmail.com>',
        to: options.email,
        subject: "Gift Card Purchase",
        html:`
    <html>
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@200;400;600&display=swap" rel="stylesheet">
            <style>
                ${main_style}
                h3{margin-bottom: 5rem}
                .message, p {font-size: 18px}
                .core{border: 5px double #ffdab9; padding: 1rem; border-radius: 10px }
            </style>
        </head>
        
        <body> 
        <table>
            <tr>
                <th>
                    <a href=${websiteLink}><img class="logo" src="https://firebasestorage.googleapis.com/v0/b/cakedilemma.appspot.com/o/main%2Flogo2.png?alt=media&token=b22ffdda-5bc4-4bdf-8d5d-c1cf5102d572" /></a>
                </th>
            </tr>
                <td>
                    <h1>Thank You ${options.name} for purchasing a gift card.</h1>
                    <br/>
                    <p class="message">Message sent: <br> ${!options.message ? " " : options.message}</p>
                    <p class="core"> Balance: £${options.data.balance} </p>
                    <p class="core"> Code: ${options.data.code}</p>
                    <br/><br/>
                    <p> Gift card information </p>
                    <p> Order ID: ${options.data._id}</p>
                    <p> Expiry Date: ${new Date(options.data.expiry).toISOString().slice(0,10)} </p>
                    <p>How to Use: Copy the code above and paste into the gift card box at the checkout on our website. Can be used multiple times until the balance has been used up or the gift card expires.</p>
                </td>
            <tr>
            </tr>
        </table>
    
        ${footer_reply}
        </body>
    </html>
    `
    }
    await transporter.sendMail(mailOptions)
}

// send the gift card to the Recipient's email
exports.sendGiftCardToRecipientEmail = async options => {
    const transporter = EmailNoReply()

    const mailOptions = {
        from: 'Cake Dilemma <thecakedilemma.noreply@gmail.com>',
        to: options.email,
        subject: "Your Gift Card",
        html:`
    <html>
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@200;400;600&display=swap" rel="stylesheet">
            <style>
                ${main_style}
                h3{margin-bottom: 5rem}
                .message, p {font-size: 18px}
                .core{border: 5px double #ffdab9; padding: 1rem; border-radius: 10px }
            </style>
        </head>
        
        <body> 
        <table>
            <tr>
                <th>
                    <a href=${websiteLink}><img class="logo" src="https://firebasestorage.googleapis.com/v0/b/cakedilemma.appspot.com/o/main%2Flogo2.png?alt=media&token=b22ffdda-5bc4-4bdf-8d5d-c1cf5102d572" /></a>
                </th>
            </tr>
            <tr>
                <td>
                    <h1>Hi! You have received a gift card for The Cake Dilemma from ${options.name}.</h1>
                    <br/>
                    <p class="message">Message from sender: <br> ${!options.message ? " " : options.message}</p>
                    <p class="core"> Balance: £${options.data.balance} </p>
                    <p class="core"> Code: ${options.data.code}</p>
                    <br/><br/>
                    <p> Gift card information </p>
                    <p> Order ID: ${options.data._id}</p>
                    <p> Expiry Date: ${new Date(options.data.expiry).toISOString().slice(0,10)} </p>
                    <p>How to Use: Copy the code above and paste into the gift card box at the checkout on our website. Can be used multiple times until the balance has been used up or the gift card expires. <br>
                    You can check your gift card balance anytime on the the website</p>
                </td>
            </tr>
        </table>
        ${footer_reply}
        </body>
    </html>
    `
    }
    await transporter.sendMail(mailOptions)
}
