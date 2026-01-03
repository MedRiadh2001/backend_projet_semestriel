import { Injectable } from '@nestjs/common';
const PDFDocument = require('pdfkit');
import * as fs from 'fs';
import { Reservation } from '../reservation/entities/Reservation.entity';

@Injectable()
export class PdfService {
    generateReservationPdf(reservation: Reservation, outputPath: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const doc = new PDFDocument({ size: 'A4', margin: 50 });
            const stream = fs.createWriteStream(outputPath);

            doc.pipe(stream);

            // Titre
            doc.fontSize(20).text('Détails de la réservation', { align: 'center' });
            doc.moveDown();

            // Détails de la réservation
            doc.fontSize(14).text(`Reservation ID: ${reservation.id}`);
            doc.text(`Start Date: ${reservation.startDate}`);
            doc.text(`End Date: ${reservation.endDate}`);
            doc.text(`Status: ${reservation.status}`);
            doc.moveDown();

            // Détails du client
            doc.fontSize(16).text('Client', { underline: true });
            doc.fontSize(14).text(`Nom: ${reservation.client.firstName} ${reservation.client.lastName}`);
            doc.text(`Email: ${reservation.client.email}`);
            doc.text(`Téléphone: ${reservation.client.phone}`);
            doc.text(`Adresse: ${reservation.client.address}`);
            doc.moveDown();

            // Détails de la chambre
            doc.fontSize(16).text('Chambre', { underline: true });
            doc.fontSize(14).text(`Numéro: ${reservation.room.number}`);
            doc.text(`Etage: ${reservation.room.floor}`);
            doc.text(`Type de chambre: ${reservation.room.roomType.name}`);
            doc.text(`Capacité: ${reservation.room.roomType.capacity}`);
            doc.text(`Prix par nuit: ${reservation.room.roomType.pricePerNight}`);
            doc.moveDown();

            doc.end();

            stream.on('finish', () => resolve(outputPath));
            stream.on('error', (err) => reject(err));
        });
    }
}
