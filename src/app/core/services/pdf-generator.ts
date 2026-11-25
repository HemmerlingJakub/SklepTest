import { Injectable } from '@angular/core';
import { TDocumentDefinitions, TVirtualFileSystem } from 'pdfmake/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  async generateInvoice(data: {
    clientName: string;
    email: string;
    deliveryAddress: string;
    transactionId: string;
    paymentMethod: string;
    paidTotal: number;
    items: { name: string; price: number }[];
  }): Promise<void> {
    const [{ default: pdfMake }, pdfFonts] = await Promise.all([
      import('pdfmake/build/pdfmake'),
      import('pdfmake/build/vfs_fonts'),
    ]);

    pdfMake.addVirtualFileSystem(
      (pdfFonts as unknown as { default: TVirtualFileSystem }).default ??
      (pdfFonts as unknown as TVirtualFileSystem),
    );

    const tableBody = [
      [
        { text: 'Produkt / usługa', bold: true, color: '#FFFFFF' },
        { text: 'Cena', bold: true, alignment: 'right' as const, color: '#FFFFFF' },
      ],
      ...data.items.map(item => [
        item.name,
        { text: `${item.price.toFixed(2)} PLN`, alignment: 'right' as const },
      ]),
    ];

    const docDefinition: TDocumentDefinitions = {
      pageSize: 'A4',
      pageMargins: [48, 48, 48, 48],
      info: {
        title: `Potwierdzenie zamówienia ${data.transactionId}`,
        author: 'Gaming Store',
        subject: 'Potwierdzenie płatności',
      },
      content: [
        {
          text: 'GAMING STORE',
          style: 'brand',
        },
        {
          text: 'POTWIERDZENIE ZAMÓWIENIA',
          style: 'header',
        },
        {
          columns: [
            {
              width: '*',
              text: [
                { text: 'Numer transakcji\n', bold: true },
                data.transactionId,
              ],
            },
            {
              width: 'auto',
              alignment: 'right',
              text: [
                { text: 'Data wystawienia\n', bold: true },
                new Date().toLocaleDateString('pl-PL'),
              ],
            },
          ],
          columnGap: 20,
          margin: [0, 12, 0, 18],
        },
        {
          table: {
            widths: ['*', '*'],
            body: [
              [
                {
                  stack: [
                    { text: 'NABYWCA', style: 'sectionTitle' },
                    data.clientName,
                    data.email ? `E-mail: ${data.email}` : '',
                  ],
                  fillColor: '#F4F6F8',
                  margin: [10, 10, 10, 10],
                },
                {
                  stack: [
                    { text: 'ADRES DOSTAWY', style: 'sectionTitle' },
                    data.deliveryAddress || 'Adres nie został podany',
                  ],
                  fillColor: '#F4F6F8',
                  margin: [10, 10, 10, 10],
                },
              ],
            ],
          },
          layout: 'noBorders',
          margin: [0, 0, 0, 18],
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto'],
            body: tableBody,
          },
          layout: {
            hLineWidth: () => 0.5,
            vLineWidth: () => 0,
            hLineColor: () => '#D6DCE2',
            fillColor: (rowIndex: number) => rowIndex === 0 ? '#1F2937' : null,
            paddingLeft: () => 10,
            paddingRight: () => 10,
            paddingTop: () => 9,
            paddingBottom: () => 9,
          },
          margin: [0, 0, 0, 18],
        },
        {
          columns: [
            {
              width: '*',
              text: [
                { text: 'Metoda płatności\n', bold: true },
                data.paymentMethod,
              ],
            },
            {
              width: 180,
              table: {
                widths: ['*', 'auto'],
                body: [
                  [
                    { text: 'SUMA CAŁKOWITA', bold: true, color: '#FFFFFF' },
                    { text: `${data.paidTotal.toFixed(2)} PLN`, bold: true, alignment: 'right', color: '#FFFFFF' },
                  ],
                ],
              },
              layout: {
                hLineWidth: () => 0,
                vLineWidth: () => 0,
                fillColor: () => '#1F2937',
                paddingLeft: () => 10,
                paddingRight: () => 10,
                paddingTop: () => 12,
                paddingBottom: () => 12,
              },
            },
          ],
          columnGap: 20,
        },
        {
          text: 'Dziękujemy za zakup!',
          style: 'footer',
        },
      ],
      styles: {
        brand: { fontSize: 12, bold: true, color: '#2563EB', characterSpacing: 1, margin: [0, 0, 0, 6] },
        header: { fontSize: 22, bold: true, color: '#111827', margin: [0, 0, 0, 4] },
        sectionTitle: { fontSize: 9, bold: true, color: '#2563EB', margin: [0, 0, 0, 5] },
        footer: { fontSize: 11, bold: true, color: '#64748B', alignment: 'center', margin: [0, 24, 0, 0] },
      },
      defaultStyle: {
        fontSize: 10,
        color: '#374151',
        lineHeight: 1.35,
      },
    };
    pdfMake.createPdf(docDefinition).download('dokument.pdf');
  }
}
