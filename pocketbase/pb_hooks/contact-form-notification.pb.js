/// <reference path="../pb_data/types.d.ts" />

onRecordAfterCreateSuccess((e) => {
  const contactEmail = e.record.get("email");
  const contactName = e.record.get("name");
  
  // These are empty in your screenshot, so we use Romanian fallbacks
  const contactCompany = e.record.get("company") || "Nespecificat";
  const contactPhone = e.record.get("phone") || "Nu a fost furnizat";
  const contactWebsite = e.record.get("website") || "Nespecificat";
  const contactMessage = e.record.get("message") || "Fără mesaj";
  const recordId = e.record.id;

  // 1. Notificare pentru Administrator (Admin Notification)
  const adminMessage = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: "contact@webbly.ro" }],
    subject: "Solicitare nouă: " + contactName,
    html: "<h2>Detalii solicitare nouă</h2>" +
          "<p><strong>Nume:</strong> " + contactName + "</p>" +
          "<p><strong>Email:</strong> " + contactEmail + "</p>" +
          "<p><strong>Website:</strong> " + contactWebsite + "</p>" +
          "<p><strong>Mesaj:</strong></p>" +
          "<p>" + contactMessage.replace(/\n/g, "<br>") + "</p>" +
          "<hr>" +
          "<p><small>ID Înregistrare: " + recordId + "</small></p>"
  });
  $app.newMailClient().send(adminMessage);

  // 2. Email Confirmare Client (Trimis către utilizator)
  const confirmationMessage = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: contactEmail }],
    subject: "Am primit mesajul tău - Webbly",
    html: "<h3>Salut, " + contactName + "!</h3>" +
          "<p>Îți mulțumim pentru interes. Am primit cererea ta și un consultant Webbly o va analiza în cel mai scurt timp.</p>" +
          "<p>Vom reveni cu un răspuns pe această adresă de email.</p>" +
          "<br>" +
          "<p>O zi excelentă,<br><strong>Echipa Webbly</strong></p>"
  });
  $app.newMailClient().send(confirmationMessage);

  e.next();
}, "contacts");