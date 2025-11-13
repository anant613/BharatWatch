import {transporter} from "./emailTransporter.js"



const sendVerificationMail = async (otp,user) => {
  console.log(process.env.SMTP_SERVER);
  
    
  const info = await transporter.sendMail({
    from: process.env.EMAIL_SENDER,
    to: user.email,
    subject: "Verify You Email",
    html: `<html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width">
      <title>BharatWatch — Verify your email</title>
      <style>
        /* Basic reset for email clients */
        body,table,td,a{ -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
        table,td{ mso-table-lspace:0pt; mso-table-rspace:0pt; }
        img{ -ms-interpolation-mode:bicubic; display:block; border:0; outline:none; text-decoration:none; }
        body{ margin:0; padding:0; width:100% !important; font-family: Arial, Helvetica, sans-serif; background-color:#f4f6fb; }
        .wrapper{ width:100%; max-width:600px; margin:0 auto; }
        .card{ background:#ffffff; border-radius:10px; padding:28px; box-shadow:0 4px 18px rgba(11,37,69,0.08); }
        .brand{ display:flex; align-items:center; gap:12px; }
        .logo{ width:56px; height:56px; border-radius:8px; background:#ff6f00; display:inline-block; text-align:center; line-height:56px; color:white; font-weight:700; font-size:18px; }
        h1{ margin:18px 0 8px; color:#0b2545; font-size:20px; }
        p{ margin:0 0 14px; color:#4a5568; font-size:15px; line-height:1.5; }
        .otp{ font-weight:700; font-size:28px; letter-spacing:4px; color:#0b2545; background:#f7f9ff; padding:18px 22px; border-radius:8px; display:inline-block; margin:12px 0; }
        .btn{ display:inline-block; text-decoration:none; padding:12px 18px; border-radius:8px; font-weight:600; background:#ff6f00; color:#fff; }
        .muted{ color:#8892a6; font-size:13px; }
        .footer{ font-size:13px; color:#8892a6; text-align:center; margin-top:18px; }
        .small{ font-size:12px; color:#98a0b2; }
        /* Responsive tweaks */
        @media only screen and (max-width:420px){
          .card{ padding:18px; }
          .otp{ font-size:22px; padding:14px 16px; }
        }
      </style>
    </head>
    <body>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td align="center" style="padding:28px 16px;">
            <div class="wrapper" style="max-width:600px;width:100%;">
              <div class="card" style="background:#fff;border-radius:10px;padding:28px;">
                <!-- header -->
                <table role="presentation" width="100%" style="border:none;">
                  <tr>
                    <td style="padding-bottom:12px;">
                      <div class="brand" style="display:flex;align-items:center;gap:12px;">
                        <!-- Replace LOGO_URL or use the text logo block -->
                        <img src="{{LOGO_URL}}" alt="BharatWatch" style="width:56px;height:56px;border-radius:8px;object-fit:cover;">
                        <div>
                          <div style="font-weight:800;color:#0b2545;font-size:18px;">BharatWatch</div>
                          <div style="font-size:12px;color:#98a0b2;margin-top:2px;">Security · Alerts · Trust</div>
                        </div>
                      </div>
                    </td>
                  </tr>
    
                  <tr>
                    <td>
                      <h1 style="margin:18px 0 8px;color:#0b2545;font-size:20px;">Your verification code</h1>
                      <p style="margin:0 0 12px;color:#4a5568;font-size:15px;line-height:1.5;">
                        Use the one-time password (OTP) below to verify your email for <strong>BharatWatch</strong>.
                        This code will expire in <strong>10 minutes</strong>.
                      </p>
    
                      <!-- OTP -->
                      <div class="otp" style="font-weight:700;font-size:28px;letter-spacing:4px;color:#0b2545;background:#f7f9ff;padding:18px 22px;border-radius:8px;display:inline-block;margin:12px 0;">
                       ${otp}
                      </div>
    
                      <p style="margin:12px 0 18px;color:#4a5568;font-size:15px;line-height:1.5;">
                        Or click the button below to verify automatically.
                      </p>
    
                      <!-- Verify button -->
                      <a href="{{VERIFY_URL}}" class="btn" style="display:inline-block;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:600;background:#ff6f00;color:#fff;">
                        Verify my email
                      </a>
    
                      <p class="muted" style="margin:18px 0 0;color:#8892a6;font-size:13px;">
                        Didn’t request this code? If you didn’t try to sign in or register, ignore this email or contact our support.
                      </p>
                    </td>
                  </tr>
                </table>
    
                <!-- divider -->
                <table role="presentation" width="100%" style="margin-top:20px;border-top:1px solid #eef2f7;padding-top:18px;">
                  <tr>
                    <td style="vertical-align:top;">
                      <p class="small" style="margin:0;color:#98a0b2;font-size:12px;">
                        Need help? Contact <a href="mailto:support@bharatwatch.example" style="color:#0b2545;text-decoration:none;">support@bharatwatch.example</a>
                      </p>
                    </td>
                    <td style="text-align:right;vertical-align:top;">
                      <p class="small" style="margin:0;color:#98a0b2;font-size:12px;">© BharatWatch {{YEAR}}</p>
                    </td>
                  </tr>
                </table>
              </div>
    
              <div class="footer" style="margin-top:14px;color:#8892a6;font-size:13px;">
                You received this email because a sign-in or registration was attempted for your BharatWatch account.
              </div>
            </div>
          </td>
        </tr>
      </table>
    </body>
    </html>`,
  });
  console.log("Message sent:", info.messageId);

}
export { sendVerificationMail };

  
