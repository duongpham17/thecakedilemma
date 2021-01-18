const nodemailer = require('nodemailer');

const dotenv = require('dotenv')
dotenv.config({ path: "./config.env" });

const websiteLink = process.env.NODE_ENV === "production" ? process.env.WEBSITE_URL : process.env.FRONTEND_PORT;

const collection_address = "63 Peveril Road, Beeston, NG9 2HU";

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
                html { font-family: 'Assistant', 'Arial', 'sans-serif'; text-align: center; background: white; padding: 1rem}
                table{ max-width: 600px; text-align: center; margin: 2rem auto;}
                .logo{ width: 40%; height:auto }
                footer{padding: 1rem; background: #ffdab9; margin-top: 20rem}
                h3{margin-bottom: 4rem}
                .code{font-size: 30px}
            </style>
        </head>
        
        <body> 
        <table>
            <tr>
                <th>
                    <a href=${websiteLink}><img class="logo" src="https://firebasestorage.googleapis.com/v0/b/cakedilemma.appspot.com/o/main%2Flogo.jpeg?alt=media&token=d14d06fa-88d3-422f-99c8-46c260502f19" />
                    </a>
                </th>
            </tr>
            <tr>
                <td>
                    <h3>Email Confirmation Code</h3>
                    <p class="code">${options.code}</p>
                </td>
            </tr>
        </table>
    
        <footer>
            <p>The Cake Dilemma est. 2020. Please do not respond to this email. Contact us via email at 
            <a href="mailto:thecakedilemma@gmail.com">thecakedilemma@gmail.com</a> with any enquiries or follow our socials - Instagram: 
            <a href="https://www.instagram.com/thecakedilemma/">@thecakedilemma</a>
            </p>
        </footer>
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
                html { font-family: 'Assistant', 'Arial', 'sans-serif'; text-align: center; background: white; padding: 1rem}
                table{ max-width: 600px; text-align: center; margin: 2rem auto;}
                .logo{ width: 40%; height:auto }
                footer{padding: 1rem; background: #ffdab9; margin-top: 20rem}
                .reset_link {color: black; text-decoration: none; padding: 1rem 2rem; border: 1px solid #ffdab9; }
                .reset_link:hover {color: white;background: #ffdab9; }
                h3{margin-bottom: 4rem}
            </style>
        </head>
        
        <body> 
        <table>
            <tr>
                <th>
                    <a href=${websiteLink}><img class="logo" src="https://firebasestorage.googleapis.com/v0/b/cakedilemma.appspot.com/o/main%2Flogo2.png?alt=media&token=b22ffdda-5bc4-4bdf-8d5d-c1cf5102d572" />
                    </a>
                </th>
            </tr>
            <tr>
                <td>
                    <h3>Password Reset Request - please do not reply to this email.</h3>
                    <p><a class="reset_link" href=${options.url}>Click me to reset password</a></p>
                </td>
            </tr>
        </table>
    
        <footer>
            <p>The Cake Dilemma est. 2020. Please do not respond to this email. Contact us via email at 
            <a href="mailto:thecakedilemma@gmail.com">thecakedilemma@gmail.com</a> with any enquiries or follow our socials - Instagram: 
            <a href="https://www.instagram.com/thecakedilemma/">@thecakedilemma</a>
            </p>
        </footer>
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
                html { font-family: 'Assistant', 'Arial', 'sans-serif'; text-align: center; background: white; padding: 1rem}
                table{ max-width: 600px; text-align: center; margin: 2rem auto;}
                .logo{ width: 30%; height:auto }
                .order-item p { text-align: left; width: 100%}
                footer{padding: 1rem; background: #ffdab9; margin-top: 5rem}
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
                    <h2>Your Order ID : ${options.data.id}</h2>
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
                <td class="grand-total"> <p>Shipping<br>Discount<br>Total</p> </td>
                <td> <p>£${Number(options.data.postage).toFixed(2)}<br>£${Number(options.data.discount_value).toFixed(2)}<br> £${options.data.discount ? Number(options.data.total_with_discount).toFixed(2) : Number(options.data.total).toFixed(2)}</p> </td>
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
                    Delivery/Collection Address - ${options.data.method === "Delivery" ? `${options.data.address_1}, ${options.data.address_2}, ${options.data.city}, ${options.data.postcode}` :  `${collection_address}`}
                    </p> 
                </td>
            </tr>
        </table>
    
    
        <footer>
            <p>The Cake Dilemma est. 2020. Please do not respond to this email. Contact us via email at 
            <a href="mailto:thecakedilemma@gmail.com">thecakedilemma@gmail.com</a> with any enquiries or follow our socials - Instagram: 
            <a href="https://www.instagram.com/thecakedilemma/">@thecakedilemma</a>
            </p>
        </footer>
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
                html { font-family: 'Assistant', 'Arial', 'sans-serif'; text-align: center; background: white; padding: 1rem}
                table{ max-width: 600px; text-align: center; margin: 2rem auto}
                .logo{ width: 40%; height:auto }
                footer{padding: 1rem; background: #ffdab9; margin-top: 20rem}
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
                    <p>Name: ${options.data.first_name} ${options.data.last_name}</h3>
                    <p>Order ID: ${options.data._id}</h3>
                    <p>Method: ${options.data.method}</h3>
                    <p>Date: ${options.data.date}</h3>
                </td>
            </tr>
        </table>
    
        <footer>
            <p>The Cake Dilemma est. 2020. Please do not respond to this email. Contact us via email at 
            <a href="mailto:thecakedilemma@gmail.com">thecakedilemma@gmail.com</a> with any enquiries or follow our socials - Instagram: 
            <a href="https://www.instagram.com/thecakedilemma/">@thecakedilemma</a>
            </p>
        </footer>
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
        subject: "Order is ready",
        html:`
    <html>
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@200;400;600&display=swap" rel="stylesheet">
            <style>
                html { font-family: 'Assistant', 'Arial', 'sans-serif'; text-align: center; background: white; padding: 1rem}
                table{ max-width: 600px; text-align: center; margin: 2rem auto;}
                .logo{ width: 40%; height:auto }
                footer{padding: 1rem; background: #ffdab9; margin-top: 20rem}
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
                    <p class="message">${options.message}</p>
                </td>
            </tr>
        </table>
    
        <footer>
            <p>The Cake Dilemma est. 2020. Please do not respond to this email. Contact us via email at 
            <a href="mailto:thecakedilemma@gmail.com">thecakedilemma@gmail.com</a> with any enquiries or follow our socials - Instagram: 
            <a href="https://www.instagram.com/thecakedilemma/">@thecakedilemma</a>
            </p>
        </footer>
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
                html { font-family: 'Assistant', 'Arial', 'sans-serif'; text-align: center; background: white; padding: 1rem}
                table{ max-width: 600px; text-align: center; margin: 2rem auto}
                .logo{ width: 40%; height:auto }
                footer{padding: 1rem; background: #ffdab9; margin-top: 20rem}
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
            <footer> <p>The Cake Dilemma est. 2020. Follow our socials - Instagram: <a href="https://www.instagram.com/thecakedilemma/">@thecakedilemma</a> </p> </footer>
            </body>
        </html>
    `
    }
    await transporter.sendMail(mailOptions)
}