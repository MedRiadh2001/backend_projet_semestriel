import { Injectable } from '@nestjs/common';
const PDFDocument = require('pdfkit');
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Facture } from './entities/Facture.entity';

@Injectable()
export class FacturePdfService {
    async generateFacturePdf(facture: Facture): Promise<string> {
        const downloadsPath = path.join(os.homedir(), 'Downloads');

        if (!fs.existsSync(downloadsPath)) {
            fs.mkdirSync(downloadsPath, { recursive: true });
        }

        const filePath = path.join(
            downloadsPath,
            `facture-${facture.id}.pdf`,
        );

        const doc = new PDFDocument({ size: 'A4', margin: 50 });
        doc.pipe(fs.createWriteStream(filePath));

        /* ===== HEADER ===== */
        doc
            .fontSize(20)
            .text('FACTURE', { align: 'center' })
            .moveDown();

        doc
            .fontSize(12)
            .text(`Facture ID : ${facture.id}`)
            .text(`Date : ${facture.issueDate.toDateString()}`)
            .moveDown();

        /* ===== CLIENT ===== */
        const client = facture.reservation.client;
        doc
            .fontSize(14)
            .text('Client', { underline: true })
            .fontSize(12)
            .text(`Nom : ${client.firstName} ${client.lastName}`)
            .text(`Email : ${client.email}`)
            .text(`Téléphone : ${client.phone}`)
            .text(`Adresse : ${client.address}`)
            .moveDown();

        /* ===== CHAMBRE ===== */
        const room = facture.reservation.room;
        doc
            .fontSize(14)
            .text('Chambre', { underline: true })
            .fontSize(12)
            .text(`Numéro : ${room.number}`)
            .text(`Étage : ${room.floor}`)
            .text(`Type : ${room.roomType.name}`)
            .text(`Prix / nuit : ${room.roomType.pricePerNight} DT`)
            .moveDown();

        /* ===== RESERVATION ===== */
        const reservation = facture.reservation;
        doc
            .fontSize(14)
            .text('Réservation', { underline: true })
            .fontSize(12)
            .text(`Du : ${reservation.startDate.toDateString()}`)
            .text(`Au : ${reservation.endDate.toDateString()}`)
            .text(`Statut : ${reservation.status}`)
            .moveDown();

        /* ===== TOTAL ===== */
        doc
            .fontSize(16)
            .text(`Total à payer : ${facture.totalAmount} DT`, {
                align: 'right',
            })
            .moveDown();

        doc
            .fontSize(12)
            .text(`Mode de paiement : ${facture.paymentType}`, {
                align: 'right',
            });

        doc.end();

        return filePath;
    }
}
