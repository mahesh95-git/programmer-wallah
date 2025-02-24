import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import jsPDF from 'jspdf';

const CertificateGenerator = ({
    studentName = "Student Name",
    courseName = "Course Name",
    completionDate = new Date().toLocaleDateString()
}) => {
    const canvasRef = useRef(null);

    const generateCertificate = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = 794;
        canvas.height = 1123;

        const bgGradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
        bgGradient.addColorStop(0, "#FAF9F6"); // Light ivory
        bgGradient.addColorStop(1, "#F0EEE9"); // Slightly darker cream
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const borderGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        borderGradient.addColorStop(0, "#B8A078"); // Soft gold
        borderGradient.addColorStop(0.5, "#D1B991"); // Lighter bronze
        borderGradient.addColorStop(1, "#B8A078");
        ctx.strokeStyle = borderGradient;
        ctx.lineWidth = 8; // Slightly thinner border
        ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

        const titleFont = "bold 48px 'Merriweather', serif"; 
        const scriptFont = "italic 34px 'Cormorant Garamond', serif"; 
        const bodyFont = "28px 'Open Sans', sans-serif";

        ctx.font = titleFont;
        ctx.fillStyle = "#4A4A4A"; 
        ctx.textAlign = "center";
        ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 2;
        ctx.fillText("Programmer Wallah", canvas.width / 2, 150);
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;

        // Certificate Header
        ctx.font = titleFont;
        ctx.fillStyle = "#333333";
        ctx.fillText("Certificate of Completion", canvas.width / 2, 280);

        // Certification Text
        ctx.font = scriptFont;
        ctx.fillStyle = "#555555";
        ctx.fillText("This is to certify that", canvas.width / 2, 380);

        // Student Name
        ctx.font = "bold 58px 'Cormorant Garamond', serif";
        ctx.fillStyle = "#222222";
        ctx.fillText(studentName, canvas.width / 2, 480);

        // Course Completion Text
        ctx.font = bodyFont;
        ctx.fillStyle = "#444444";
        ctx.fillText("has successfully completed the course", canvas.width / 2, 550);

        // Course Name
        ctx.font = "bold 42px 'Merriweather', serif";
        ctx.fillStyle = "#111111";
        ctx.fillText(courseName, canvas.width / 2, 620);

        // Completion Date
        ctx.font = "italic 26px 'Open Sans', sans-serif";
        ctx.fillStyle = "#666666";
        ctx.fillText(`Completed on ${completionDate}`, canvas.width / 2, 690);

        // Signature Line
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 150, canvas.height - 180);
        ctx.lineTo(canvas.width / 2 + 150, canvas.height - 180);
        ctx.strokeStyle = "#444444";
        ctx.lineWidth = 1.5; // Thinner line
        ctx.stroke();

        // Signature and Title
        ctx.font = "bold 22px 'Arial', sans-serif";
        ctx.fillStyle = "#444444";
        ctx.fillText("Mahesh Rathod", canvas.width / 2, canvas.height - 150);

        ctx.font = "18px 'Arial', sans-serif";
        ctx.fillStyle = "#666666";
        ctx.fillText("Director, Programmer Wallah", canvas.width / 2, canvas.height - 120);
    };

    const downloadCertificate = () => {
        generateCertificate();

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'a4'
        });

        const canvas = canvasRef.current;
        const imgData = canvas.toDataURL('image/png', 1.0);

        pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
        pdf.save(`${courseName.replace(/\s+/g, '_')}_Certificate.pdf`);
    };

    return (
        <div className="w-full space-y-4 flex flex-col items-center">
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <Button onClick={downloadCertificate} className="bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-400 text-white w-60 flex items-center justify-center gap-2 p-3 rounded-lg shadow-md">
                <Download className="w-5 h-5" />
                Download Certificate
            </Button>
        </div>
    );
};

export default CertificateGenerator;