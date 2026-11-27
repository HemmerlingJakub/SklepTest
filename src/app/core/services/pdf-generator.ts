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
        { text: 'Product / service', bold: true, color: '#FFFFFF' },
        { text: 'Price', bold: true, alignment: 'right' as const, color: '#FFFFFF' },
      ],
      ...data.items.map(item => [
        item.name,
        { text: `$${item.price.toFixed(2)} USD`, alignment: 'right' as const },
      ]),
    ];

    const docDefinition: TDocumentDefinitions = {
      pageSize: 'A4',
      pageMargins: [48, 48, 48, 48],
      info: {
        title: `Order confirmation ${data.transactionId}`,
        author: 'Gaming Store',
        subject: 'Payment confirmation',
      },
      content: [
        {
          stack: [
            { text: 'GAMING STORE', style: 'brand' },
            { text: 'ORDER CONFIRMATION', style: 'header' },
          ],
          margin: [0, 0, 0, 18],
        },
        {
          columns: [
            {
              width: '*',
              text: [
                { text: 'Transaction number\n', bold: true },
                data.transactionId,
              ],
            },
            {
              width: 'auto',
              alignment: 'right',
              text: [
                { text: 'Issue date\n', bold: true },
                new Date().toLocaleDateString('en-GB'),
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
                    { text: 'CUSTOMER', style: 'sectionTitle' },
                    data.clientName,
                    data.email ? `E-mail: ${data.email}` : '',
                  ],
                  fillColor: '#F4F6F8',
                  margin: [10, 10, 10, 10],
                },
                {
                  stack: [
                    { text: 'DELIVERY ADDRESS', style: 'sectionTitle' },
                    data.deliveryAddress || 'No address provided',
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
                { text: 'Payment method\n', bold: true },
                data.paymentMethod,
              ],
            },
            {
              width: 180,
              table: {
                widths: ['*', 'auto'],
                body: [
                  [
                    { text: 'TOTAL AMOUNT', bold: true, color: '#FFFFFF' },
                    { text: `$${data.paidTotal.toFixed(2)} USD`, bold: true, alignment: 'right', color: '#FFFFFF' },
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
          text: 'Thank you for your purchase!',
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
    pdfMake.createPdf(docDefinition).download('invoice.pdf');
  }
}
