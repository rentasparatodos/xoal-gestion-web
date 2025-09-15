
import {onDocumentCreated} from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import {Resend} from "resend";
import {defineSecret} from "firebase-functions/params";
import {z} from "zod";

const resendApiKey = defineSecret("RESEND_API_KEY");

const ContactFormSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, introduce una dirección de email válida.",
  }),
  mensaje: z.string().min(10, {
    message: "El mensaje debe tener al menos 10 caracteres.",
  }),
});

export const sendcontactemail = onDocumentCreated(
  {
    document: "contact-form/{docId}",
    secrets: [resendApiKey],
    region: "europe-west1",
  },
  async (event) => {
    logger.info("Función activada por un nuevo documento de contacto.");

    const snapshot = event.data;
    if (!snapshot) {
      logger.error("No hay datos asociados al evento del formulario.");
      return;
    }

    const rawData = snapshot.data();
    const validationResult = ContactFormSchema.safeParse(rawData);

    if (!validationResult.success) {
      logger.error("Los datos del formulario no superaron la validación.", {
        error: validationResult.error.flatten(),
        rawData: rawData,
      });
      return;
    }

    const {nombre, email, mensaje} = validationResult.data;
    logger.info(`Procesando mensaje validado de: ${nombre} (${email})`);

    const resend = new Resend(resendApiKey.value());

    const adminHtml = `
      <h1>Nuevo Mensaje de Contacto</h1>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <hr>
      <p><strong>Mensaje:</strong></p>
      <div><p>${mensaje}</p></div>
    `;

    const adminEmail = {
      from: "Xoal Gestión <no-reply@xoalgestion.com>",
      to: ["info@xoalgestion.com", "jheredia@xoalgestion.com"],
      subject: `Nuevo Mensaje de Contacto: ${nombre}`,
      html: adminHtml,
    };

    const userHtml = `
      <h1>¡Gracias por contactarnos, ${nombre}!</h1>
      <p>Hemos recibido tu mensaje y te contactaremos pronto.</p>
      <p>Atentamente, El equipo de Xoal Gestión</p>
    `;

    const userConfirmationEmail = {
      from: "Xoal Gestión <no-reply@xoalgestion.com>",
      to: [email],
      subject: "Hemos recibido tu consulta - Xoal Gestión",
      html: userHtml,
    };

    try {
      await resend.emails.send(adminEmail);
      const toAdmin = adminEmail.to.join(", ");
      logger.info(`Notificación a administradores enviada a: ${toAdmin}`);

      await resend.emails.send(userConfirmationEmail);
      logger.info(`Confirmación al usuario enviada a ${email}.`);
    } catch (error) {
      logger.error("Error al enviar correos con Resend:", error);
    }
  },
);
