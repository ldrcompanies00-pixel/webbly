/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const leadName = e.record.get("name");
  const leadEmail = e.record.get("email");
  const leadCompany = e.record.get("company");
  const leadPhone = e.record.get("phone");
  const leadStatus = e.record.get("status");
  const recordId = e.record.id;

  console.log("[LEAD-MAGNET] New lead created: " + recordId);
  console.log("[LEAD-MAGNET] Lead details - Name: " + leadName + ", Email: " + leadEmail + ", Company: " + leadCompany);

  // ===== ADMIN NOTIFICATION =====
  console.log("[LEAD-MAGNET] Starting admin notification process...");
  
  try {
    const adminEmail = "contact@webbly.ro";
    console.log("[LEAD-MAGNET] Admin email target: " + adminEmail);
    
    const senderAddress = $app.settings().meta.senderAddress;
    const senderName = $app.settings().meta.senderName;
    console.log("[LEAD-MAGNET] Sender address: " + senderAddress + ", Sender name: " + senderName);

    // Construct minimal, bulletproof HTML for admin email
    const adminHtmlBody = "<p>New lead received:</p>" +
      "<p><strong>Name:</strong> " + (leadName || "N/A") + "</p>" +
      "<p><strong>Email:</strong> " + (leadEmail || "N/A") + "</p>" +
      "<p><strong>Company:</strong> " + (leadCompany || "N/A") + "</p>" +
      "<p><strong>Phone:</strong> " + (leadPhone || "N/A") + "</p>" +
      "<p><strong>Status:</strong> " + (leadStatus || "N/A") + "</p>" +
      "<p><strong>Record ID:</strong> " + recordId + "</p>";

    console.log("[LEAD-MAGNET] Admin email HTML constructed, length: " + adminHtmlBody.length);

    const adminMessage = new MailerMessage({
      from: {
        address: senderAddress,
        name: senderName
      },
      to: [{ address: adminEmail }],
      subject: "New Lead: " + (leadCompany || "Unknown"),
      html: adminHtmlBody
    });

    console.log("[LEAD-MAGNET] MailerMessage object created for admin");
    console.log("[LEAD-MAGNET] Admin message from: " + JSON.stringify(adminMessage.from));
    console.log("[LEAD-MAGNET] Admin message to: " + JSON.stringify(adminMessage.to));
    console.log("[LEAD-MAGNET] Admin message subject: " + adminMessage.subject);

    const mailClient = $app.newMailClient();
    console.log("[LEAD-MAGNET] Mail client initialized");

    mailClient.send(adminMessage);
    console.log("[LEAD-MAGNET] Admin notification email sent successfully to " + adminEmail);

  } catch (adminError) {
    console.log("[LEAD-MAGNET] ERROR sending admin notification: " + adminError.toString());
    console.log("[LEAD-MAGNET] Error stack: " + adminError.stack);
    // Continue to client email even if admin email fails
  }

  // ===== CLIENT CONFIRMATION EMAIL =====
  console.log("[LEAD-MAGNET] Starting client confirmation email process...");
  
  try {
    const senderAddress = $app.settings().meta.senderAddress;
    const senderName = $app.settings().meta.senderName;

    // Logo-ul adaptat pentru email (format text stilizat)
    const logoHtml = `<div style="background-color: #0F172A; padding: 20px; border-radius: 8px 8px 0 0; text-align: left;">
        <a href="https://webbly.ro" style="text-decoration: none; font-family: Arial, sans-serif; font-size: 32px; font-weight: 800; color: #F8FAFC; letter-spacing: -1px;">
            Webbly<span style="color: #D4AF37;">.</span>
        </a>
    </div>`;

    const clientHtmlBody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        ${logoHtml}
        <div style="padding: 25px;">
            <h2 style="color: #2c3e50; margin-top: 0;">Multumim pentru interesul acordat!</h2>
            <p>Salut <strong>${leadCompany || "partenerule"}</strong>,</p>
            <p>Am primit solicitarea ta. Un specialist <strong>Webbly</strong> va analiza performanta, design-ul si optimizarea SEO a site-ului tau.</p>
        <p>Vei primi un raport detaliat cu recomandari personalizate in cel mai scurt timp pe aceasta adresa de email.</p>
        <p>Daca ai intrebari intre timp, ne poti contacta oricand la <a href="mailto:contact@webbly.ro" style="color: #ff9800; text-decoration: none;">contact@webbly.ro</a>.</p>
        <br>
        <p>Toate cele bune,<br>
        <strong>Echipa Webbly</strong></p>
      </div>`;

    console.log("[LEAD-MAGNET] Client email HTML constructed, length: " + clientHtmlBody.length);

    const clientMessage = new MailerMessage({
      from: {
        address: senderAddress,
        name: senderName
      },
      to: [{ address: leadEmail }],
      subject: "Webbly | Audit Website Gratuit",
      html: clientHtmlBody
    });

    console.log("[LEAD-MAGNET] MailerMessage object created for client");
    console.log("[LEAD-MAGNET] Client message from: " + JSON.stringify(clientMessage.from));
    console.log("[LEAD-MAGNET] Client message to: " + JSON.stringify(clientMessage.to));
    console.log("[LEAD-MAGNET] Client message subject: " + clientMessage.subject);

    const mailClient = $app.newMailClient();
    console.log("[LEAD-MAGNET] Mail client initialized for client email");

    mailClient.send(clientMessage);
    console.log("[LEAD-MAGNET] Client confirmation email sent successfully to " + leadEmail);

  } catch (clientError) {
    console.log("[LEAD-MAGNET] ERROR sending client confirmation: " + clientError.toString());
    console.log("[LEAD-MAGNET] Error stack: " + clientError.stack);
    throw new BadRequestError("Failed to send confirmation email: " + clientError.toString());
  }

  console.log("[LEAD-MAGNET] All notifications completed successfully for lead " + recordId);
  e.next();
}, "leads");