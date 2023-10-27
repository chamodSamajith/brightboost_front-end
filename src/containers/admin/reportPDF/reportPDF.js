import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import CustomizableTable from '../dashboard/CustomizableTable';

const ReportPDF = ({ rows, columns, columnWidths }) => {
    const generatePDF = () => {
        const doc = new jsPDF();

        doc.text('Report Table', 10, 10);
        doc.autoTable({ html: '#report-table' });

        doc.save('report.pdf');
    };

    return (
        <div>
            <button onClick={generatePDF}>Generate PDF</button>
            <div>
                <CustomizableTable rows={rows} columns={columns} columnWidths={columnWidths}/>
            </div>
        </div>
    );
};

export default ReportPDF;
